// app/auth/page.tsx
import AuthForm from "@/components/auth/AuthForm";

export default function AuthPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen w-full bg-gradient-to-br from-indigo-50 to-blue-100">
            <div className="w-full max-w-md px-4">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-gray-800">Notewise</h1>
                    <p className="text-gray-600 mt-2">Your AI-powered note-taking companion</p>
                </div>

                <AuthForm />

                <div className="text-center mt-6 text-sm text-gray-500">
                    <p>Capture, organize, and enhance your ideas with AI assistance</p>
                </div>
            </div>
        </div>
    );
}