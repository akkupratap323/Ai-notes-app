"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useNotes } from "@/hooks/use-notes"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ArrowLeft, Save, Sparkles, Star } from "lucide-react"
import { cn } from "@/lib/utils"
import { summarizeTextWithGemini } from "@/lib/utils/ai"
import { toast } from "@/components/ui/use-toast"

interface NoteEditorProps {
  noteId?: string
}

export function NoteEditor({ noteId }: NoteEditorProps) {
  const { user } = useAuth()
  const router = useRouter()
  const {
    note,
    noteIsLoading,
    createNote,
    updateNote,
    deleteNote,
    toggleFavorite,
    generateSummary,
    isUpdating,
    isGeneratingSummary,
  } = useNotes(noteId)

  const existingNote = note
  const isLoading = noteIsLoading

  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [isFavorite, setIsFavorite] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [isAISummarizing, setIsAISummarizing] = useState(false)
  const [aiSummaryError, setAISummaryError] = useState<string | null>(null)
  const [isGeminiSummarizing, setIsGeminiSummarizing] = useState(false)
  const [geminiSummaryError, setGeminiSummaryError] = useState<string | null>(null)

  useEffect(() => {
    if (existingNote) {
      setTitle(existingNote.title)
      setContent(existingNote.content)
      setIsFavorite(existingNote.is_favorite)
    }
  }, [existingNote])

  const handleSave = async () => {
    if (!user) return

    setIsSaving(true)
    toast({ title: noteId ? "Saving note..." : "Creating note...", description: noteId ? "Updating your note." : "Creating a new note.", className: "!bg-blue-500 !text-white" })

    try {
      if (noteId) {
        updateNote({
          id: noteId,
          title,
          content,
        }, {
          onSuccess: () => {
            toast({
              title: "Note updated!",
              description: "Your note was saved successfully.",
              className: "!bg-green-500 !text-white",
            })
          },
          onError: (err) => {
            toast({ title: "Error", description: err.message || "Failed to update note.", variant: "destructive" })
          }
        })
      } else {
        const newNote = {
          user_id: user.id,
          title: title || "Untitled Note",
          content,
          is_favorite: false,
          summary: null, // Add summary as null for new notes
        }
        createNote(newNote, {
          onSuccess: (data) => {
            toast({
              title: "Note created!",
              description: "Your new note was created.",
              className: "!bg-green-500 !text-white",
            })
            router.push(`/dashboard/notes/${data.id}`)
          },
          onError: (err) => {
            toast({ title: "Error", description: err.message || "Failed to create note.", variant: "destructive" })
          }
        })
      }
    } catch (error) {
      toast({ title: "Error", description: "Unexpected error while saving.", variant: "destructive" })
      console.error("Error saving note:", error)
    } finally {
      setIsSaving(false)
    }
  }

  const handleToggleFavorite = () => {
    if (noteId) {
      toggleFavorite({ id: noteId, isFavorite })
      setIsFavorite(!isFavorite)
    }
  }

  const handleGenerateSummary = () => {
    if (noteId && content.trim().length > 0) {
      toast({ title: "Generating AI summary...", description: "AI is summarizing your note.", className: "!bg-blue-500 !text-white" })
      generateSummary({ id: noteId, content })
    }
  }

  // Handler for Gemini AI summary
  const handleGeminiSummary = async () => {
    if (!noteId || !content.trim()) return
    setIsGeminiSummarizing(true)
    setGeminiSummaryError(null)
    toast({ title: "Generating Gemini summary...", description: "Gemini AI is summarizing your note.", className: "!bg-blue-500 !text-white" })
    try {
      const summary = await summarizeTextWithGemini(content)
      await updateNote({ id: noteId, summary }, {
        onSuccess: () => {
          toast({ title: "AI Summary updated!", description: "Gemini summary added to your note.", className: "!bg-green-500 !text-white" })
        },
        onError: (err) => {
          toast({ title: "Error", description: err.message || "Failed to update summary.", variant: "destructive" })
        }
      })
    } catch (err: any) {
      setGeminiSummaryError(err.message || "Failed to generate summary")
      toast({ title: "Error", description: err.message || "Failed to generate summary", variant: "destructive" })
    } finally {
      setIsGeminiSummarizing(false)
    }
  }

  const handleBack = () => {
    router.push("/dashboard")
  }

  if (isLoading && noteId) {
    return <NoteEditorSkeleton />
  }

  return (
    <div className="flex flex-col h-full max-w-2xl mx-auto px-2 sm:px-4 md:px-8 py-4 w-full">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4">
        <Button variant="ghost" onClick={handleBack} className="gap-1 w-fit">
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>
        <div className="flex flex-wrap gap-2 justify-end">
          {noteId && (
            <>
              <Button
                variant="outline"
                size="sm"
                className={cn(isFavorite && "text-yellow-500")}
                onClick={handleToggleFavorite}
                disabled={isUpdating}
              >
                <Star className="h-4 w-4 mr-1" fill={isFavorite ? "currentColor" : "none"} />
                {isFavorite ? "Favorited" : "Favorite"}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGenerateSummary}
                disabled={isGeneratingSummary || content.length === 0}
              >
                <Sparkles className="h-4 w-4 mr-1" />
                Summarize
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleGeminiSummary}
                disabled={isGeminiSummarizing || content.length === 0}
              >
                <Sparkles className="h-4 w-4 mr-1 text-green-500" />
                AI Summary (Gemini)
              </Button>
            </>
          )}
          <Button onClick={handleSave} disabled={isSaving} className="gap-1">
            <Save className="h-4 w-4" />
            Save
          </Button>
        </div>
      </div>
      {aiSummaryError && (
        <div className="text-red-500 text-sm mb-2">{aiSummaryError}</div>
      )}
      {geminiSummaryError && (
        <div className="text-red-500 text-sm mb-2">{geminiSummaryError}</div>
      )}
      <Card className="flex-1 rounded-xl shadow-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
        <CardHeader className="pb-2">
          <Input
            placeholder="Note title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="text-xl font-semibold border-none px-0 focus-visible:ring-0 bg-transparent"
          />
        </CardHeader>
        <CardContent>
          <Textarea
            placeholder="Write your note here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[200px] sm:min-h-[300px] resize-none border-none p-0 focus-visible:ring-0 bg-transparent"
          />
        </CardContent>
        {existingNote?.summary && (
          <CardFooter className="border-t pt-4">
            <div className="w-full">
              <div className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-500 dark:text-gray-400">
                <Sparkles className="h-4 w-4" />
                AI Summary
              </div>
              <p className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-line">{existingNote.summary}</p>
            </div>
          </CardFooter>
        )}
      </Card>
    </div>
  )
}

export function NoteEditorSkeleton() {
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <Skeleton className="h-9 w-20" />
        <div className="flex gap-2">
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-24" />
          <Skeleton className="h-9 w-20" />
        </div>
      </div>

      <Card className="flex-1">
        <CardHeader className="pb-2">
          <Skeleton className="h-8 w-3/4" />
        </CardHeader>
        <CardContent>
          <Skeleton className="h-[300px] w-full" />
        </CardContent>
      </Card>
    </div>
  )
}
