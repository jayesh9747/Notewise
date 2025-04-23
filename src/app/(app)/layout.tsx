'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import { AppSidebar } from '@/components/navigation/sidebar';
import { AppNavbar } from '@/components/navigation/navbar';
import { ReactNode } from 'react';
import { User } from '@supabase/supabase-js'; // Import the User type

interface LayoutProps {
    children: ReactNode;
}

export default function ProtectedLayout({ children }: LayoutProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(true);
    const [user, setUser] = useState<User | null>(null); // Explicitly define the type

    useEffect(() => {
        const checkAuth = async () => {
            const {
                data: { session },
            } = await supabase.auth.getSession();

            if (!session) {
                router.push('/auth');
            } else {
                setUser(session.user);
                setIsLoading(false);
            }
        };

        checkAuth();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            if (event === 'SIGNED_OUT') {
                router.push('/auth');
            } else if (session) {
                setUser(session.user);
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [router]);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-screen w-full">
                <div className="flex flex-col items-center space-y-2">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-blue-500"></div>
                    <p className="text-lg font-medium text-gray-700">Loading...</p>
                </div>
            </div>
        )
    }

    return (
        <>
            <AppSidebar />
            <div className="flex flex-col flex-1">
                {user && <AppNavbar user={user} />}
                <main className="flex-1 w-full p-4 overflow-auto">{children}</main>
            </div>
        </>
    );
}
