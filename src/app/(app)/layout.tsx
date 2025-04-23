'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { AppSidebar } from "@/components/navigation/sidebar"
import { AppNavbar } from "@/components/navigation/navbar"
import { ReactNode } from "react"

interface LayoutProps {
    children: ReactNode
}

export default function ProtectedLayout({ children }: LayoutProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [user, setUser] = useState(null)

    useEffect(() => {
        const checkAuth = async () => {
            const { data: { session } } = await supabase.auth.getSession()

            if (!session) {
                router.push('/auth')
            } else {
                setUser(session.user)
                setIsLoading(false)
            }
        }

        checkAuth()

        const { data: { subscription } } = supabase.auth.onAuthStateChange(
            (event, session) => {
                if (event === 'SIGNED_OUT') {
                    router.push('/auth')
                } else if (session) {
                    setUser(session.user)
                }
            }
        )

        return () => subscription.unsubscribe()
    }, [router])

    if (isLoading) {
        return <div className="flex-1 items-center justify-center max-w-full h-screen">Loading...</div>
    }

    return (
        <>
            <AppSidebar />
            <div className="flex flex-col flex-1">
                <AppNavbar user={user} />
                <main className="flex-1 w-full p-4 overflow-auto">
                    {children}
                </main>
            </div>
        </>
    )
}