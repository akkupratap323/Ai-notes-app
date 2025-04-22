import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Navbar } from "@/components/layout/header"
import Head from "next/head"

export default function Home() {
  return (
    <>
      <Head>
        <title>AI-Powered Notes for Modern Teams | NotesApp</title>
        <meta name="description" content="Effortlessly create, organize, and summarize your notes with advanced AI. Secure, collaborative, and built for productivity." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="AI-Powered Notes for Modern Teams" />
        <meta property="og:description" content="Effortlessly create, organize, and summarize your notes with advanced AI." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://yournotesapp.com" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="flex min-h-screen flex-col bg-gradient-to-br from-background to-blue-50 dark:to-zinc-900">
        <Navbar />
        <main className="flex-1">
          {/* Hero Section */}
          <section className="w-full py-16 md:py-28 lg:py-36 bg-gradient-to-b from-transparent to-blue-100 dark:to-zinc-900">
            <div className="container px-4 md:px-6">
              <div className="flex flex-col items-center justify-center space-y-6 text-center">
                <div className="space-y-4" data-aos="fade-up">
                  <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent drop-shadow-lg">
                    AI-Powered Notes for Modern Teams
                  </h1>
                  <p className="mx-auto max-w-2xl text-gray-600 dark:text-gray-300 md:text-xl font-medium">
                    Effortlessly create, organize, and summarize your notes with advanced AI. Secure, collaborative, and built for productivity.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3" data-aos="fade-up" data-aos-delay="200">
                  <Button asChild size="lg" className="rounded-full px-8 py-5 text-lg font-semibold shadow-lg bg-gradient-to-r from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600 transition-all duration-300 transform hover:scale-105">
                    <Link href="/signup" aria-label="Get started with Notes App">
                      Get Started
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-5 text-lg font-semibold border-2 border-blue-500 text-blue-700 dark:text-blue-300 hover:bg-blue-50 dark:hover:bg-zinc-800 transition-all duration-300">
                    <Link href="/login" aria-label="Sign in to Notes App">
                      Sign In
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </section>

          {/* Features Section */}
          <section className="w-full py-16 md:py-24 lg:py-32 bg-white dark:bg-zinc-900 border-t">
            <div className="container px-4 md:px-6">
              <h2 className="sr-only">Features</h2>
              <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
                {features.map((feature, index) => (
                  <div 
                    key={feature.title}
                    className="flex flex-col items-center space-y-3 text-center"
                    data-aos="fade-up"
                    data-aos-delay={index * 100}
                  >
                    <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-100 to-blue-300 dark:from-zinc-800 dark:to-zinc-700 shadow">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-bold">{feature.title}</h3>
                    <p className="text-gray-500 dark:text-gray-400">{feature.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="border-t py-8 bg-white dark:bg-zinc-900">
          <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
            <p className="text-center text-sm text-gray-500 md:text-left">
              &copy; {new Date().getFullYear()} AI Notes App. All rights reserved.
            </p>
            <div className="flex gap-4">
              <Link 
                href="https://github.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-blue-600 transition-colors"
                aria-label="GitHub repository"
              >
                GitHub
              </Link>
              <Link 
                href="mailto:support@ainotes.com" 
                className="text-gray-400 hover:text-blue-600 transition-colors"
                aria-label="Contact support"
              >
                Contact
              </Link>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

// Feature data
const features = [
  {
    title: "Create Notes",
    description: "Create and organize your notes in one place. Access them from anywhere, anytime.",
    icon: (
      <svg className="h-7 w-7 text-blue-600 dark:text-blue-300" fill="none" height="28" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="28">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
        <polyline points="14 2 14 8 20 8" />
      </svg>
    )
  },
  {
    title: "AI Summarization",
    description: "Let AI instantly summarize your long notes into concise, actionable insights for your team.",
    icon: (
      <svg className="h-7 w-7 text-indigo-600 dark:text-indigo-300" fill="none" height="28" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="28">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
        <path d="M12 9v4" />
        <path d="M12 17h.01" />
      </svg>
    )
  },
  {
    title: "Secure & Private",
    description: "Your notes are encrypted, secure, and private. Only you and your team can access them.",
    icon: (
      <svg className="h-7 w-7 text-green-600 dark:text-green-300" fill="none" height="28" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="28">
        <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
        <path d="m9 12 2 2 4-4" />
      </svg>
    )
  }
]