import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://demo.supabase.co'
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'demo-key'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database Types
export interface Thread {
    id: string
    title: string
    content: string
    author_id: string
    author_name: string
    category_id: string
    category_name: string
    created_at: string
    updated_at: string
    views: number
    replies_count: number
    is_pinned: boolean
    is_locked: boolean
    tags: string[]
}

export interface Post {
    id: string
    thread_id: string
    content: string
    author_id: string
    author_name: string
    author_role: string
    created_at: string
    updated_at: string
    likes_count: number
    is_solution: boolean
}

export interface Category {
    id: string
    title: string
    description: string
    slug: string
    color: string
    threads_count: number
    posts_count: number
    icon: string
}

// API Functions
export async function getThreads(categoryId?: string) {
    let query = supabase
        .from('threads')
        .select('*')
        .order('created_at', { ascending: false })

    if (categoryId) {
        query = query.eq('category_id', categoryId)
    }

    const { data, error } = await query

    if (error) throw error
    return data as Thread[]
}

export async function getThread(id: string) {
    const { data, error } = await supabase
        .from('threads')
        .select('*')
        .eq('id', id)
        .single()

    if (error) throw error
    return data as Thread
}

export async function getPosts(threadId: string) {
    const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('thread_id', threadId)
        .order('created_at', { ascending: true })

    if (error) throw error
    return data as Post[]
}

export async function getCategories() {
    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('title', { ascending: true })

    if (error) throw error
    return data as Category[]
}

export async function createThread(thread: Partial<Thread>) {
    const { data, error } = await supabase
        .from('threads')
        .insert([thread])
        .select()
        .single()

    if (error) throw error
    return data as Thread
}

export async function createPost(post: Partial<Post>) {
    const { data, error } = await supabase
        .from('posts')
        .insert([post])
        .select()
        .single()

    if (error) throw error
    return data as Post
}

export async function incrementThreadViews(threadId: string) {
    const { error } = await supabase.rpc('increment_thread_views', {
        thread_id: threadId
    })

    if (error) throw error
}
