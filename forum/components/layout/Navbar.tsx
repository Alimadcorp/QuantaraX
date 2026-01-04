import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Atom, Search, User, Menu } from "lucide-react"

export function Navbar() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/80 backdrop-blur-md">
            <div className="container flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="relative flex items-center justify-center w-10 h-10 rounded-full bg-cyan-500/10 group-hover:bg-cyan-500/20 transition-colors">
                        <Atom className="w-6 h-6 text-cyan-400 group-hover:animate-spin-slow" />
                        <div className="absolute inset-0 rounded-full ring-1 ring-cyan-500/30 group-hover:ring-cyan-500/50 transition-all"></div>
                    </div>
                    <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-400">
                        QuantaraX
                    </span>
                </Link>

                <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-muted-foreground">
                    <Link href="/" className="hover:text-cyan-400 transition-colors">Discussions</Link>
                    <Link href="/categories" className="hover:text-cyan-400 transition-colors">Categories</Link>
                    <Link href="/members" className="hover:text-cyan-400 transition-colors">Members</Link>
                    <Link href="/about" className="hover:text-cyan-400 transition-colors">About</Link>
                </nav>

                <div className="flex items-center gap-4">
                    <div className="relative hidden sm:block">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input
                            type="search"
                            placeholder="Search particles..."
                            className="h-9 w-[200px] lg:w-[300px] rounded-md border border-input bg-background/50 pl-9 pr-4 text-sm outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all placeholder:text-muted-foreground/50"
                        />
                    </div>
                    <Button variant="glow" size="sm" className="hidden sm:flex">
                        <User className="mr-2 h-4 w-4" />
                        Log In
                    </Button>
                    <Button variant="ghost" size="icon" className="md:hidden">
                        <Menu className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </header>
    )
}
