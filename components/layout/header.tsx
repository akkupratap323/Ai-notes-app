"use client"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { memo, useCallback, useMemo } from "react"
import { useAuth } from "@/hooks/use-auth"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { LogOut, User, Settings, Plus, Home, NotebookText } from "lucide-react"
import { Skeleton } from "@/components/ui/skeleton"
import { useToast } from "@/components/ui/use-toast"
import { cn } from "@/lib/utils"

export const Navbar = memo(function Navbar() {
  const pathname = usePathname()
  const router = useRouter()
  const { toast } = useToast()
  const { user, signOut, loading } = useAuth()

  const handleSignOut = useCallback(async () => {
    try {
      await signOut()
      toast({
        title: "Logged out successfully",
        description: "You have been signed out of your account",
      })
      router.push("/login")
    } catch (error) {
      toast({
        title: "Error",
        description: "Couldn't sign out. Please try again.",
        variant: "destructive",
      })
    }
  }, [signOut, toast, router])

  const getInitials = useCallback((name?: string | null) => {
    if (!name) return "US"
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }, [])

  const getUserName = useCallback(() => {
    if (user?.user_metadata?.full_name) return user.user_metadata.full_name
    if (user?.email) return user.email.split("@")[0]
    return "User"
  }, [user])

  const navLinks = useMemo(() => [
    // Removed Dashboard, Notes, and Create links
  ], [])

  const isActive = useCallback((href: string) => {
    return pathname === href || 
           (href !== "/" && pathname.startsWith(href))
  }, [pathname])

  if (pathname.includes("/auth")) return null

  return (
    <header className="sticky top-0 z-40 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-8">
          <Link 
            href="/" 
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
              AI Notes
            </span>
          </Link>
          
          {user && navLinks.length > 0 && (
            <nav className="hidden items-center space-x-6 text-sm font-medium md:flex">
              {navLinks.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className={cn(
                    "flex items-center gap-1 transition-colors",
                    isActive(href) 
                      ? "text-foreground" 
                      : "text-foreground/60 hover:text-foreground/80"
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        <div className="flex items-center gap-4">
          {loading ? (
            <div className="flex items-center gap-4">
              <Skeleton className="h-9 w-9 rounded-full" />
              <Skeleton className="hidden h-8 w-24 rounded-md sm:block" />
            </div>
          ) : user ? (
            <div className="flex items-center gap-4">
              <Button
                size="sm"
                className="hidden h-8 rounded-full sm:flex"
                asChild
              >
                <Link 
                  href="/dashboard/notes/new" 
                  className="flex items-center gap-1"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Note</span>
                </Link>
              </Button>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-9 w-9 rounded-full focus-visible:ring-2 focus-visible:ring-offset-2"
                  >
                    <Avatar className="h-9 w-9">
                      {user.user_metadata?.avatar_url && (
                        <AvatarImage 
                          src={user.user_metadata.avatar_url} 
                          alt={getUserName()}
                        />
                      )}
                      <AvatarFallback delayMs={600}>
                        {getInitials(user.user_metadata?.full_name || user.email)}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56"
                  align="end"
                  forceMount
                >
                  <div className="flex items-center gap-2 p-2">
                    <Avatar className="h-9 w-9">
                      {user.user_metadata?.avatar_url && (
                        <AvatarImage 
                          src={user.user_metadata.avatar_url} 
                          alt={getUserName()}
                        />
                      )}
                      <AvatarFallback>
                        {getInitials(user.user_metadata?.full_name || user.email)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {getUserName()}
                      </p>
                      {user.email && (
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      )}
                    </div>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link 
                      href="/dashboard" 
                      className="w-full cursor-pointer"
                    >
                      <Home className="mr-2 h-4 w-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link 
                      href="/settings" 
                      className="w-full cursor-pointer"
                    >
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="w-full cursor-pointer text-destructive focus:text-destructive focus:bg-destructive/10"
                    onClick={handleSignOut}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                asChild
                className="hidden sm:inline-flex"
              >
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild>
                <Link href="/signup">Get started</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
})