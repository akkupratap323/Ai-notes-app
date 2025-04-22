"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import type { Note } from "@/types/supabase"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { Star, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "@/components/ui/use-toast"

interface NoteCardProps {
  note: Note
  onDelete: (id: string) => void
  onToggleFavorite: (id: string, isFavorite: boolean) => void
}

export function NoteCard({ note, onDelete, onToggleFavorite }: NoteCardProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (confirm("Are you sure you want to delete this note?")) {
      setIsDeleting(true)
      try {
        await onDelete(note.id)
        toast({ title: "Note deleted", description: "Your note was deleted successfully." })
      } catch (err: any) {
        toast({ title: "Error", description: err?.message || "Failed to delete note.", variant: "destructive" })
      } finally {
        setIsDeleting(false)
      }
    }
  }

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    try {
      onToggleFavorite(note.id, note.is_favorite)
      toast({ title: note.is_favorite ? "Removed from favorites" : "Added to favorites" })
    } catch (err: any) {
      toast({ title: "Error", description: err?.message || "Failed to update favorite.", variant: "destructive" })
    }
  }

  const formattedDate = note.updated_at ? formatDistanceToNow(new Date(note.updated_at), { addSuffix: true }) : ""

  return (
    <Link href={`/dashboard/notes/${note.id}`} passHref>
      <Card className="h-full cursor-pointer transition-shadow hover:shadow-lg rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between">
            <CardTitle className="line-clamp-1 text-lg font-semibold text-primary">
              {note.title}
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              className={cn("h-8 w-8", note.is_favorite ? "text-yellow-500" : "text-gray-400")}
              onClick={handleToggleFavorite}
            >
              <Star className="h-5 w-5" fill={note.is_favorite ? "currentColor" : "none"} />
              <span className="sr-only">{note.is_favorite ? "Remove from favorites" : "Add to favorites"}</span>
            </Button>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          {note.summary ? (
            <p className="line-clamp-3 text-sm text-gray-500 dark:text-gray-300">{note.summary}</p>
          ) : (
            <p className="line-clamp-3 text-sm text-gray-500 dark:text-gray-300">{note.content}</p>
          )}
        </CardContent>
        <CardFooter className="flex items-center justify-between pt-0">
          <p className="text-xs text-gray-400 dark:text-gray-500">{formattedDate}</p>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-gray-400 hover:text-red-500"
            onClick={handleDelete}
            disabled={isDeleting}
          >
            <Trash2 className="h-4 w-4" />
            <span className="sr-only">Delete note</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  )
}

export function NoteCardSkeleton() {
  return (
    <Card className="h-full">
      <CardHeader className="pb-2">
        <Skeleton className="h-6 w-3/4" />
      </CardHeader>
      <CardContent className="pb-2">
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-2/3" />
      </CardContent>
      <CardFooter className="pt-0">
        <Skeleton className="h-4 w-1/4" />
      </CardFooter>
    </Card>
  )
}
