'use client'

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowLeft, MessageSquare, Share2, Flag, ThumbsUp } from "lucide-react"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getThread, getPosts, incrementThreadViews, type Thread, type Post } from "@/lib/supabase"

export default function ThreadPage({ params }: { params: { id: string } }) {
    const [thread, setThread] = useState<Thread | null>(null)
    const [posts, setPosts] = useState<Post[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        async function loadThread() {
            try {
                setLoading(true)
                const [threadData, postsData] = await Promise.all([
                    getThread(params.id),
                    getPosts(params.id)
                ])
                setThread(threadData)
                setPosts(postsData)

                // Increment view count
                await incrementThreadViews(params.id)
            } catch (err) {
                console.error('Error loading thread:', err)
                setError('Thread not found or database error')
            } finally {
                setLoading(false)
            }
        }
        loadThread()
    }, [params.id])

    if (loading) {
        return (
            <div className="container px-4 py-20 text-center">
                <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <p className="text-muted-foreground">Loading thread...</p>
            </div>
        )
    }

    if (error || !thread) {
        return (
            <div className="container px-4 py-20 text-center">
                <Card className="max-w-md mx-auto bg-slate-900/40 p-8">
                    <h2 className="text-xl font-bold text-red-400 mb-2">Thread Not Found</h2>
                    <p className="text-sm text-muted-foreground mb-4">{error}</p>
                    <Link href="/">
                        <Button variant="outline">Back to Home</Button>
                    </Link>
                </Card>
            </div>
        )
    }

    // Create initial post from thread content
    const allPosts = [
        {
            id: 'op',
            thread_id: thread.id,
            content: thread.content,
            author_name: thread.author_name,
            author_role: 'OP',
            created_at: thread.created_at,
            updated_at: thread.updated_at,
            likes_count: 0,
            is_solution: false,
            author_id: thread.author_id
        },
        ...posts
    ]

    return (
        <div className="container px-4 py-8 max-w-5xl mx-auto space-y-6">
            <Link href="/" className="inline-flex items-center text-sm text-muted-foreground hover:text-cyan-400 transition-colors mb-4">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Discussions
            </Link>

            <div className="space-y-4">
                <div className="flex flex-col gap-4">
                    <div className="flex gap-2">
                        <Badge variant="outline">{thread.category_name}</Badge>
                        {thread.tags.map(tag => (
                            <Badge key={tag} variant="secondary" className="bg-slate-800 text-slate-400 border-none">{tag}</Badge>
                        ))}
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-slate-100">{thread.title}</h1>
                    <div className="flex gap-4 text-sm text-muted-foreground">
                        <span>{thread.views} views</span>
                        <span>{thread.replies_count} replies</span>
                    </div>
                </div>
            </div>

            <div className="space-y-6 mt-8">
                {allPosts.map((post, index) => (
                    <Card key={post.id} className={`bg-slate-900/40 border-slate-800 ${index === 0 ? 'border-cyan-500/30 shadow-[0_0_20px_rgba(6,182,212,0.05)]' : ''}`}>
                        <div className="flex flex-col md:flex-row">
                            {/* Author Side */}
                            <div className="p-6 md:w-48 flex flex-col items-center text-center border-b md:border-b-0 md:border-r border-slate-800 bg-slate-950/30">
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-purple-500 p-[2px] mb-3">
                                    <div className="w-full h-full rounded-full bg-slate-900 flex items-center justify-center text-xl font-bold">
                                        {post.author_name.substring(0, 2).toUpperCase()}
                                    </div>
                                </div>
                                <h4 className="font-semibold text-cyan-400 mb-1">{post.author_name}</h4>
                                <Badge variant="outline" className="text-[10px] uppercase mb-4">{post.author_role}</Badge>
                            </div>

                            {/* Content Side */}
                            <div className="flex-1 flex flex-col">
                                <div className="p-4 border-b border-slate-800/50 flex justify-between items-center text-xs text-muted-foreground">
                                    <span>{new Date(post.created_at).toLocaleString()}</span>
                                    <div className="flex gap-2">
                                        <span className="text-slate-500">#{index + 1}</span>
                                    </div>
                                </div>

                                <div className="p-6 flex-1 text-slate-300 whitespace-pre-wrap">
                                    {post.content}
                                </div>

                                <div className="p-4 bg-slate-950/20 border-t border-slate-800/50 flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-cyan-400">
                                            <ThumbsUp className="w-4 h-4 mr-2" />
                                            {post.likes_count}
                                        </Button>
                                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                                            <MessageSquare className="w-4 h-4 mr-2" />
                                            Reply
                                        </Button>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-white">
                                            <Share2 className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-red-400">
                                            <Flag className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>

            {/* Reply Box */}
            <Card className="p-6 mt-8 bg-slate-900/60 border-slate-800">
                <h3 className="text-lg font-semibold mb-4">Post a Reply</h3>
                <div className="space-y-4">
                    <textarea
                        className="w-full min-h-[150px] p-4 rounded-md bg-slate-950/50 border border-slate-800 text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 transition-all font-mono text-sm resize-y"
                        placeholder="Write your contribution to science..."
                    />
                    <div className="flex justify-end gap-4">
                        <Button variant="ghost">Preview</Button>
                        <Button variant="default" className="bg-cyan-600 hover:bg-cyan-500 text-white">Post Reply</Button>
                    </div>
                </div>
            </Card>
        </div>
    )
}
