import type { Metadata } from "next"
import { SignupForm } from "@/components/auth/signup-form"
import { Navbar } from "@/components/layout/header"

export const metadata: Metadata = {
  title: "Sign Up - AI Notes App",
  description: "Create a new AI Notes account",
}

export default function SignupPage() {
  return (
    <div className="flex min-h-screen flex-col">
      < Navbar/>
      <main className="flex-1 flex items-center justify-center p-4">
        <SignupForm />
      </main>
    </div>
  )
}
