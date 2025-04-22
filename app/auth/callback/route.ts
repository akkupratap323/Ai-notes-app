// app/auth/callback/route.ts
import { type NextRequest, NextResponse } from "next/server"
import { getSupabaseServerClient } from "@/lib/supabase/server"

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url)
  const code = requestUrl.searchParams.get("code")

  if (!code) {
    return NextResponse.redirect(
      new URL("/login?error=missing_code", request.url)
    )
  }

  try {
    const supabase = await getSupabaseServerClient()

    // Exchange the code for a session
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    
    if (error) {
      throw error
    }

    // Successful authentication - redirect to dashboard
    return NextResponse.redirect(new URL("/dashboard", request.url))
    
  } catch (error) {
    console.error("Supabase auth callback error:", error)
    return NextResponse.redirect(
      new URL("/login?error=auth_failed", request.url)
    )
  }
}