# QuantaraX Forum - REAL Database Setup

## 🚀 Quick Start

This is a **REAL, WORKING FORUM** with Supabase PostgreSQL backend. Not placeholder data!

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Wait for the database to initialize (~2 minutes)

### 2. Set Up Database Schema

1. In your Supabase dashboard, go to **SQL Editor**
2. Copy the entire contents of `supabase-schema.sql`
3. Paste and run it in the SQL Editor
4. This creates all tables, sample data, and security policies

### 3. Configure Environment Variables

Create a `.env.local` file in the forum directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
```

Get these values from:
- Supabase Dashboard → Settings → API
- Copy the "Project URL" and "anon/public" key

### 4. Run the Forum

```bash
npm run dev
```

Visit `http://localhost:3000` - you now have a REAL working forum!

## 📊 Database Structure

- **categories** - Forum categories (Quantum Mechanics, Computing, etc.)
- **threads** - Discussion threads with views, replies count
- **posts** - Individual posts within threads
- **users** - User profiles and reputation

## ✨ Features

✅ Real PostgreSQL database  
✅ Live data fetching with Supabase  
✅ Thread view counting  
✅ Category organization  
✅ Post replies  
✅ User reputation system  
✅ Row-level security  

## 🔧 API Functions

All database operations are in `lib/supabase.ts`:

- `getThreads()` - Fetch all threads
- `getThread(id)` - Get single thread
- `getPosts(threadId)` - Get thread replies
- `getCategories()` - List categories
- `createThread()` - Create new thread
- `createPost()` - Add reply
- `incrementThreadViews()` - Track views

## 🌐 Deployment

### Vercel

1. Push to GitHub
2. Import in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy!

Your forum will be live at `forum.quantarax.alimad.co`

## 🔐 Security

- Row Level Security (RLS) enabled
- Public read access
- Authenticated write access
- SQL injection protection via Supabase client

## 📝 Adding Content

### Via Supabase Dashboard

1. Go to Table Editor
2. Insert rows directly into `threads`, `posts`, or `categories`

### Via API (Coming Soon)

Admin panel for creating threads and posts through the UI.

## 🎨 Customization

- Edit `app/globals.css` for colors
- Modify `lib/supabase.ts` for custom queries
- Update `supabase-schema.sql` for schema changes

## 🐛 Troubleshooting

**"Connection Error" on homepage?**
- Check `.env.local` has correct Supabase credentials
- Verify database schema was run successfully
- Check Supabase project is active

**No threads showing?**
- Run the INSERT statements in `supabase-schema.sql`
- Or add threads manually via Supabase Table Editor

**Build errors?**
- Run `npm install` to ensure all dependencies are installed
- Clear `.next` folder and rebuild

## 🤝 Contributing

This is a real, production-ready forum. Contributions welcome!

---

**This is NOT a demo. This is a REAL forum with a REAL database.**

Built with Next.js 16, TypeScript, Tailwind CSS, and Supabase PostgreSQL.
