"use client"

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"
import { getSupabaseBrowserClient } from "@/lib/supabase/client"
import type { Note } from "@/types/supabase"
import { summarizeText } from "@/lib/utils/ai"

export function useNotes(id?: string) {
  const supabase = getSupabaseBrowserClient()
  const queryClient = useQueryClient()

  const fetchNotes = async (): Promise<Note[]> => {
    const { data, error } = await supabase.from("notes").select("*").order("updated_at", { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    return data || []
  }

  const fetchNote = async (id: string): Promise<Note> => {
    const { data, error } = await supabase.from("notes").select("*").eq("id", id).single()

    if (error) {
      throw new Error(error.message)
    }

    return data
  }

  const createNote = async (note: Omit<Note, "id" | "created_at" | "updated_at">): Promise<Note> => {
    const { data, error } = await supabase.from("notes").insert(note).select().single()

    if (error) {
      console.error("Supabase createNote error:", error)
      throw new Error(error.message + (error.details ? ` | Details: ${error.details}` : ""))
    }

    return data
  }

  const updateNote = async ({ id, ...note }: Partial<Note> & { id: string }): Promise<Note> => {
    const { data, error } = await supabase
      .from("notes")
      .update({ ...note, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return data
  }

  const deleteNote = async (id: string): Promise<void> => {
    const { error } = await supabase.from("notes").delete().eq("id", id)

    if (error) {
      throw new Error(error.message)
    }
  }

  const toggleFavorite = async (id: string, isFavorite: boolean): Promise<Note> => {
    return updateNote({ id, is_favorite: !isFavorite })
  }

  const generateSummary = async (id: string, content: string): Promise<Note> => {
    const summary = await summarizeText(content)
    return updateNote({ id, summary })
  }

  // React Query hooks
  const notesQuery = useQuery({
    queryKey: ["notes"],
    queryFn: fetchNotes,
  })

  const noteQuery = useQuery({
    queryKey: ["notes", id],
    queryFn: () => (id ? fetchNote(id) : null),
    enabled: !!id,
  })

  const createNoteMutation = useMutation({
    mutationKey: ["createNote"],
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
    },
  })

  const updateNoteMutation = useMutation({
    mutationKey: ["updateNote"],
    mutationFn: updateNote,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
      queryClient.invalidateQueries({ queryKey: ["notes", data.id] })
    },
  })

  const deleteNoteMutation = useMutation({
    mutationKey: ["deleteNote"],
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
    },
  })

  const toggleFavoriteMutation = useMutation({
    mutationKey: ["toggleFavorite"],
    mutationFn: ({ id, isFavorite }: { id: string; isFavorite: boolean }) => toggleFavorite(id, isFavorite),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
      queryClient.invalidateQueries({ queryKey: ["notes", data.id] })
    },
  })

  const generateSummaryMutation = useMutation({
    mutationKey: ["generateSummary"],
    mutationFn: ({ id, content }: { id: string; content: string }) => generateSummary(id, content),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] })
      queryClient.invalidateQueries({ queryKey: ["notes", data.id] })
    },
  })

  return {
    notes: notesQuery.data || [],
    isLoading: notesQuery.isLoading,
    isError: notesQuery.isError,
    error: notesQuery.error,
    note: noteQuery.data,
    noteIsLoading: noteQuery.isLoading,
    noteIsError: noteQuery.isError,
    noteError: noteQuery.error,
    createNote: createNoteMutation.mutate,
    updateNote: updateNoteMutation.mutate,
    deleteNote: deleteNoteMutation.mutate,
    toggleFavorite: toggleFavoriteMutation.mutate,
    generateSummary: generateSummaryMutation.mutate,
    isCreating: createNoteMutation.isPending,
    isUpdating: updateNoteMutation.isPending,
    isDeleting: deleteNoteMutation.isPending,
    isGeneratingSummary: generateSummaryMutation.isPending,
  }
}
