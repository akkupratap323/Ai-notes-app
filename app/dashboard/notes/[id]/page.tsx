import type { Metadata } from "next"
import { NoteEditor } from "@/components/notes/note-editor"

export const metadata: Metadata = {
  title: "Edit Note - AI Notes App",
  description: "Edit your note",
}

export default function EditNotePage({ params }: { params: { id: string } }) {
  return <NoteEditor noteId={params.id} />
}
