"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useNotes } from "@/hooks/use-notes"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { NoteCard, NoteCardSkeleton } from "@/components/notes/note-card"
import { Plus, Search, Star } from "lucide-react"
import { toast } from "@/components/ui/use-toast"

export function NotesList() {
  const router = useRouter()
  const { notes, isLoading, deleteNote, toggleFavorite } = useNotes()
  const [searchQuery, setSearchQuery] = useState("")
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

  const handleCreateNote = () => {
    router.push("/dashboard/notes/new")
  }

  const handleDeleteNote = async (id: string) => {
    await deleteNote(id, {
      onSuccess: () => toast({ title: "Note deleted", description: "Your note was deleted successfully." }),
      onError: (err) => toast({ title: "Error", description: err.message || "Failed to delete note.", variant: "destructive" })
    })
  }

  const handleToggleFavorite = (id: string, isFavorite: boolean) => {
    toggleFavorite({ id, isFavorite }, {
      onSuccess: () => toast({ title: isFavorite ? "Removed from favorites" : "Added to favorites" }),
      onError: (err) => toast({ title: "Error", description: err.message || "Failed to update favorite.", variant: "destructive" })
    })
  }

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesFavorite = showFavoritesOnly ? note.is_favorite : true
    return matchesSearch && matchesFavorite
  })

  return (
    <div className="space-y-4 max-w-6xl mx-auto px-2 sm:px-4 md:px-8 py-4 w-full">
      <div className="flex flex-col sm:flex-row gap-2 sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold tracking-tight text-primary">My Notes</h1>
        <Button onClick={handleCreateNote} className="gap-1 rounded-lg shadow bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600">
          <Plus className="h-4 w-4" />
          New Note
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Search notes..."
            className="pl-8 rounded-lg shadow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button
          variant={showFavoritesOnly ? "default" : "outline"}
          onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
          className={"gap-1 rounded-lg"}
        >
          <Star className="h-4 w-4" fill={showFavoritesOnly ? "currentColor" : "none"} />
          Favorites
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <NoteCardSkeleton key={i} />
            ))}
        </div>
      ) : filteredNotes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <NoteCard key={note.id} note={note} onDelete={handleDeleteNote} onToggleFavorite={handleToggleFavorite} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 p-3 mb-4">
            <Search className="h-6 w-6 text-blue-400" />
          </div>
          <h3 className="text-lg font-medium text-primary">No notes found</h3>
          <p className="text-sm text-gray-500 mt-1 mb-4">
            {searchQuery
              ? "Try a different search term"
              : showFavoritesOnly
                ? "You don't have any favorite notes yet"
                : "Create your first note to get started"}
          </p>
          {!searchQuery && !showFavoritesOnly && (
            <Button onClick={handleCreateNote} className="gap-1 rounded-lg shadow bg-gradient-to-r from-blue-500 to-indigo-500 text-white hover:from-blue-600 hover:to-indigo-600">
              <Plus className="h-4 w-4" />
              Create Note
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
