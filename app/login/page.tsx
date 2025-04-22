import type { Metadata } from "next"
import { LoginForm } from "@/components/auth/login-form"
import { Navbar } from "@/components/layout/header"

export const metadata: Metadata = {
  title: "Login - AI Notes App",
  description: "Login to your AI Notes account",
}

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center p-4">
        <LoginForm />
      </main>
    </div>
  )
}
