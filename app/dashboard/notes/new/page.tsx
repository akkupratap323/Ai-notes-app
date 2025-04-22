import type { Metadata } from "next"
import { NoteEditor } from "@/components/notes/note-editor"

export const metadata: Metadata = {
  title: "New Note - AI Notes App",
  description: "Create a new note",
}

export default function NewNotePage() {
  return <NoteEditor />
}
