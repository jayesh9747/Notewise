'use client';
import { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { supabase } from '@/lib/supabase';

// Beautiful centered loader component
function Loader() {
  return (
    <div className="flex flex-col items-center space-y-4">
      <div className="w-16 h-16 border-4 border-t-transparent border-indigo-600 rounded-full animate-spin"></div>
      <span className="text-lg text-gray-600">Loading...</span>
    </div>
  );
}

export default function Home() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (session) {
        router.push('/notes');
      } else {
        setIsLoading(false);
      }
    };

    checkSession();
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
    <div className="flex w-full flex-col items-center justify-center min-h-screen bg-gradient-to-br from-indigo-50 to-blue-100 p-8">
      <div className="text-center mb-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">Notewise</h1>
        <p className="text-xl text-gray-600">Your AI-powered note-taking companion</p>
      </div>

      <div className="space-y-4">
        <Button
          size="lg"
          className="px-8 py-6 text-lg"
          onClick={() => router.push('/auth')}
        >
          Get Started
        </Button>
      </div>
    </div>
  );
}
