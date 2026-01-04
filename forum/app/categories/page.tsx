import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CATEGORIES } from "@/lib/data"
import { MessageSquare, FileText, TrendingUp } from "lucide-react"
import Link from "next/link"

export default function CategoriesPage() {
    return (
        <div className="container px-4 py-12 max-w-6xl mx-auto">
            <div className="mb-12 text-center">
                <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                    Forum Categories
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Explore discussions across quantum mechanics, computing, particle physics, and research.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {CATEGORIES.map((category) => (
                    <Link href={`/category/${category.slug}`} key={category.id}>
                        <Card className="group hover:border-cyan-500/50 transition-all cursor-pointer bg-slate-900/40 h-full hover:shadow-[0_0_30px_rgba(6,182,212,0.1)]">
                            <CardContent className="p-8">
                                <div className="flex justify-between items-start mb-6">
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center bg-gradient-to-br from-${category.color}-500/20 to-${category.color}-600/10 border border-${category.color}-500/30`}>
                                        <div className={`w-3 h-3 rounded-full bg-${category.color}-500 shadow-[0_0_15px_currentColor] animate-pulse`}></div>
                                    </div>
                                    <Badge variant="outline" className="text-muted-foreground text-xs">
                                        <TrendingUp className="w-3 h-3 mr-1" />
                                        Active
                                    </Badge>
                                </div>

                                <h2 className="text-2xl font-bold mb-3 group-hover:text-cyan-400 transition-colors">
                                    {category.title}
                                </h2>
                                <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
                                    {category.description}
                                </p>

                                <div className="flex items-center gap-6 text-sm">
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <MessageSquare className="w-4 h-4 text-cyan-500/70" />
                                        <span className="font-mono">{category.topics.toLocaleString()}</span>
                                        <span className="text-xs">topics</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-slate-400">
                                        <FileText className="w-4 h-4 text-purple-500/70" />
                                        <span className="font-mono">{category.posts.toLocaleString()}</span>
                                        <span className="text-xs">posts</span>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}
