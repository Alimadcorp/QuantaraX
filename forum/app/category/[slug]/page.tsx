import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ThreadCard } from "@/components/forum/ThreadCard"
import { CATEGORIES, RECENT_THREADS } from "@/lib/data"
import { ArrowLeft, Plus, Filter } from "lucide-react"
import Link from "next/link"
import { notFound } from "next/navigation"

export default function CategoryPage({ params }: { params: { slug: string } }) {
    const category = CATEGORIES.find(c => c.slug === params.slug)

    if (!category) return notFound()

    // Filter threads by category
    const categoryThreads = RECENT_THREADS.filter(t =>
        t.category.toLowerCase().replace(/\s+/g, '-') === params.slug
    )

    return (
        <div className="container px-4 py-8 max-w-6xl mx-auto">
            <Link href="/categories" className="inline-flex items-center text-sm text-muted-foreground hover:text-cyan-400 transition-colors mb-6">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Categories
            </Link>

            <div className="mb-8">
                <div className="flex items-center gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br from-${category.color}-500/20 to-${category.color}-600/10 border border-${category.color}-500/30`}>
                        <div className={`w-3 h-3 rounded-full bg-${category.color}-500 shadow-[0_0_15px_currentColor]`}></div>
                    </div>
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                            {category.title}
                        </h1>
                        <p className="text-muted-foreground mt-1">{category.description}</p>
                    </div>
                </div>

                <div className="flex flex-wrap items-center gap-4 mt-6">
                    <Badge variant="outline" className="text-sm">
                        {category.topics.toLocaleString()} Topics
                    </Badge>
                    <Badge variant="outline" className="text-sm">
                        {category.posts.toLocaleString()} Posts
                    </Badge>
                </div>
            </div>

            <div className="flex items-center justify-between mb-6">
                <div className="flex gap-2">
                    <Button variant="secondary" size="sm">Hot</Button>
                    <Button variant="outline" size="sm">New</Button>
                    <Button variant="outline" size="sm">Top</Button>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Filter className="w-4 h-4 mr-2" />
                        Filter
                    </Button>
                    <Button size="sm" className="bg-cyan-600 hover:bg-cyan-500">
                        <Plus className="w-4 h-4 mr-2" />
                        New Thread
                    </Button>
                </div>
            </div>

            <div className="space-y-4">
                {categoryThreads.length > 0 ? (
                    categoryThreads.map((thread) => (
                        <ThreadCard key={thread.id} thread={thread} />
                    ))
                ) : (
                    <div className="text-center py-20 text-muted-foreground">
                        <p className="text-lg mb-2">No threads yet in this category</p>
                        <p className="text-sm">Be the first to start a discussion!</p>
                    </div>
                )}
            </div>
        </div>
    )
}
