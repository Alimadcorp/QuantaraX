import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { MessageSquare, Eye, Clock, Flame, User } from "lucide-react"
import Link from "next/link"

interface ThreadProps {
    id: string
    title: string
    author: string
    category: string
    replies: number
    views: number
    lastActive: string
    tags: string[]
    hot?: boolean
}

export function ThreadCard({ thread }: { thread: ThreadProps }) {
    return (
        <Card className="group relative overflow-hidden transition-all hover:shadow-[0_0_20px_rgba(6,182,212,0.15)] bg-slate-900/40 border-slate-800">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/0 via-cyan-500/5 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />

            <div className="p-5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between z-10 relative">
                <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-2 mb-1">
                        <Badge variant="outline" className="border-slate-700 text-slate-400 text-[10px] uppercase tracking-wider">
                            {thread.category}
                        </Badge>
                        {thread.hot && (
                            <Badge variant="secondary" className="bg-orange-500/10 text-orange-400 border-orange-500/20 gap-1 px-1.5 py-0">
                                <Flame className="w-3 h-3" />
                                <span>Hot</span>
                            </Badge>
                        )}
                    </div>

                    <Link href={`/thread/${thread.id}`} className="block">
                        <h3 className="text-lg font-semibold text-slate-200 group-hover:text-cyan-300 transition-colors line-clamp-1">
                            {thread.title}
                        </h3>
                    </Link>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1.5 text-slate-400 hover:text-slate-300 transition-colors">
                            <div className="w-5 h-5 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700">
                                <User className="w-3 h-3" />
                            </div>
                            <span>{thread.author}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            <span>{thread.lastActive}</span>
                        </div>
                    </div>
                </div>

                <div className="flex items-center gap-4 text-slate-500 text-sm">
                    <div className="flex items-center gap-1.5 bg-slate-950/30 px-3 py-1.5 rounded-md border border-slate-800/50">
                        <MessageSquare className="w-4 h-4 text-cyan-500/70" />
                        <span>{thread.replies}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-950/30 px-3 py-1.5 rounded-md border border-slate-800/50">
                        <Eye className="w-4 h-4 text-purple-500/70" />
                        <span>{thread.views}</span>
                    </div>
                </div>
            </div>
        </Card>
    )
}
