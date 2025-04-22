import type { Metadata } from "next"
import { NotesList } from "@/components/notes/notes-list"

export const metadata: Metadata = {
  title: "Dashboard - AI Notes App",
  description: "Manage your notes",
}

export default function DashboardPage() {
  return (
    <main className="min-h-[calc(100vh-4rem)] w-full flex flex-col items-center bg-gradient-to-br from-background to-blue-50 dark:to-zinc-900 py-6 px-2 sm:px-6 md:px-10">
      <div className="w-full max-w-6xl flex flex-col gap-6">
        <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-2">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-primary mb-1">Welcome to your Dashboard</h1>
            <p className="text-muted-foreground text-base">All your notes, powered by AI, in one beautiful place.</p>
          </div>
          {/* You can add a user avatar or quick actions here if desired */}
        </header>
        <section>
          <NotesList />
        </section>
      </div>
    </main>
  )
}
