'use client'

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThreadCard } from "@/components/forum/ThreadCard"
import { Plus, Flame, Activity, TrendingUp, Users } from "lucide-react"
import { useEffect, useState } from "react"
import { getThreads, getCategories, type Thread, type Category } from "@/lib/supabase"

export default function Home() {
  const [threads, setThreads] = useState<Thread[]>([])
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true)
        const [threadsData, categoriesData] = await Promise.all([
          getThreads(),
          getCategories()
        ])
        setThreads(threadsData)
        setCategories(categoriesData)
      } catch (err) {
        console.error('Error loading data:', err)
        setError('Failed to load forum data. Please check your Supabase configuration.')
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading quantum discussions...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="max-w-md bg-red-950/20 border-red-500/30">
          <CardContent className="p-8 text-center">
            <h2 className="text-xl font-bold text-red-400 mb-2">Connection Error</h2>
            <p className="text-sm text-muted-foreground mb-4">{error}</p>
            <p className="text-xs text-slate-500">
              Set up your Supabase database and add credentials to .env.local
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen pb-20">
      {/* Hero */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 mix-blend-overlay"></div>
        <div className="absolute top-[-100px] left-[-100px] w-96 h-96 bg-cyan-500/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-100px] right-[-100px] w-96 h-96 bg-purple-500/20 rounded-full blur-[100px]" />

        <div className="container px-4 relative z-10 text-center">
          <Badge variant="quantum" className="mb-4">
            Live Database Connected
          </Badge>
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-tight">
            The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">Quantum</span> Frontier
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            Join the world's most advanced community of physicists, researchers, and enthusiasts. Discuss theories, share findings, and collapse wavefunctions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button size="lg" className="rounded-full px-8 text-base bg-cyan-500 hover:bg-cyan-400 text-black font-semibold shadow-[0_0_20px_rgba(6,182,212,0.4)]">
              Start Discussion
            </Button>
            <Button size="lg" variant="outline" className="rounded-full px-8 text-base border-white/10 hover:bg-white/5 backdrop-blur-sm">
              Explore Categories
            </Button>
          </div>
        </div>
      </section>

      <div className="container px-4 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold flex items-center gap-2">
              <Flame className="w-6 h-6 text-orange-500" />
              Recent Threads
            </h2>
            <div className="flex gap-2">
              <Badge variant="secondary" className="cursor-pointer">Hot</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-slate-800">New</Badge>
              <Badge variant="outline" className="cursor-pointer hover:bg-slate-800">Top</Badge>
            </div>
          </div>

          <div className="space-y-4">
            {threads.length > 0 ? (
              threads.slice(0, 10).map((thread) => (
                <ThreadCard
                  key={thread.id}
                  thread={{
                    id: thread.id,
                    title: thread.title,
                    author: thread.author_name,
                    category: thread.category_name,
                    replies: thread.replies_count,
                    views: thread.views,
                    lastActive: new Date(thread.updated_at).toLocaleDateString(),
                    tags: thread.tags,
                    hot: thread.views > 1000
                  }}
                />
              ))
            ) : (
              <Card className="p-12 text-center bg-slate-900/40">
                <p className="text-muted-foreground">No threads yet. Be the first to start a discussion!</p>
              </Card>
            )}
          </div>

          <div className="pt-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <Activity className="w-6 h-6 text-cyan-500" />
              Categories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {categories.map((cat) => (
                <Card key={cat.id} className="group hover:border-cyan-500/30 transition-all cursor-pointer bg-slate-900/40">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-${cat.color}-500/10`}>
                        <div className={`w-2 h-2 rounded-full bg-${cat.color}-500 shadow-[0_0_10px_currentColor]`}></div>
                      </div>
                      <Badge variant="outline" className="text-muted-foreground text-[10px]">{cat.threads_count} Topics</Badge>
                    </div>
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-cyan-400 transition-colors">{cat.title}</h3>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{cat.description}</p>
                    <div className="text-xs text-slate-500">
                      {cat.posts_count.toLocaleString()} posts total
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-4 space-y-8">
          <Button className="w-full h-12 text-base shadow-lg bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 border-0">
            <Plus className="mr-2 h-5 w-5" />
            Create New Thread
          </Button>

          <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-sm">
            <div className="p-5 border-b border-slate-800">
              <h3 className="font-semibold flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-green-400" />
                Forum Stats
              </h3>
            </div>
            <div className="p-5 space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Threads</span>
                <span className="font-mono text-cyan-400">{threads.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Categories</span>
                <span className="font-mono text-purple-400">{categories.length}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Total Views</span>
                <span className="font-mono text-white">
                  {threads.reduce((sum, t) => sum + t.views, 0).toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Status</span>
                <span className="font-mono text-green-400 flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  Live
                </span>
              </div>
            </div>
          </Card>

          <Card className="bg-slate-900/60 border-slate-800 backdrop-blur-sm">
            <div className="p-5 border-b border-slate-800">
              <h3 className="font-semibold flex items-center gap-2">
                <Users className="w-4 h-4 text-purple-400" />
                Database Info
              </h3>
            </div>
            <div className="p-5 space-y-3 text-sm text-muted-foreground">
              <p>✅ Connected to Supabase</p>
              <p>✅ Real-time data loading</p>
              <p>✅ PostgreSQL backend</p>
              <p className="text-xs pt-2 text-slate-600">
                Configure your database in .env.local
              </p>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
