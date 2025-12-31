-- QuantaraX Forum Database Schema

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Categories Table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  slug TEXT UNIQUE NOT NULL,
  color TEXT DEFAULT 'cyan',
  icon TEXT DEFAULT 'atom',
  threads_count INTEGER DEFAULT 0,
  posts_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Threads Table
CREATE TABLE threads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  author_id UUID,
  author_name TEXT NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
  category_name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  views INTEGER DEFAULT 0,
  replies_count INTEGER DEFAULT 0,
  is_pinned BOOLEAN DEFAULT FALSE,
  is_locked BOOLEAN DEFAULT FALSE,
  tags TEXT[] DEFAULT '{}'
);

-- Posts Table
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  thread_id UUID REFERENCES threads(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  author_id UUID,
  author_name TEXT NOT NULL,
  author_role TEXT DEFAULT 'Member',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  likes_count INTEGER DEFAULT 0,
  is_solution BOOLEAN DEFAULT FALSE
);

-- Users Table (simplified)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  username TEXT UNIQUE NOT NULL,
  email TEXT UNIQUE NOT NULL,
  display_name TEXT,
  role TEXT DEFAULT 'Member',
  reputation INTEGER DEFAULT 0,
  posts_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX idx_threads_category ON threads(category_id);
CREATE INDEX idx_threads_created ON threads(created_at DESC);
CREATE INDEX idx_posts_thread ON posts(thread_id);
CREATE INDEX idx_posts_created ON posts(created_at);

-- Function to increment thread views
CREATE OR REPLACE FUNCTION increment_thread_views(thread_id UUID)
RETURNS VOID AS $$
BEGIN
  UPDATE threads SET views = views + 1 WHERE id = thread_id;
END;
$$ LANGUAGE plpgsql;

-- Insert default categories
INSERT INTO categories (title, description, slug, color, icon) VALUES
('Quantum Mechanics', 'Discuss the fundamental principles of nature at the smallest scales.', 'quantum-mechanics', 'cyan', 'atom'),
('Quantum Computing', 'Qubits, quantum gates, algorithms, and hardware implementations.', 'quantum-computing', 'purple', 'cpu'),
('Particle Physics', 'The standard model, fermions, bosons, and beyond.', 'particle-physics', 'pink', 'zap'),
('Research Papers', 'Discussion and analysis of the latest arxiv preprints and journals.', 'research-papers', 'blue', 'file-text');

-- Insert sample threads
INSERT INTO threads (title, content, author_name, category_id, category_name, views, replies_count, tags) 
SELECT 
  'Does the observer effect actually require a conscious observer?',
  'I''ve been thinking about the observer effect lately. It is often stated that "observation" collapses the wave function. However, does this actually require a conscious observer? Or is interaction with a macroscopic system sufficient?',
  'HeisenbergFan',
  id,
  'Quantum Mechanics',
  1205,
  42,
  ARRAY['Measurement Problem', 'Philosophy']
FROM categories WHERE slug = 'quantum-mechanics';

INSERT INTO threads (title, content, author_name, category_id, category_name, views, replies_count, tags)
SELECT 
  'Implementing Grover''s Algorithm on Qiskit',
  'Has anyone successfully implemented Grover''s search algorithm using Qiskit? I''m running into some issues with the oracle construction.',
  'QubitMaster',
  id,
  'Quantum Computing',
  340,
  12,
  ARRAY['Qiskit', 'Algorithms']
FROM categories WHERE slug = 'quantum-computing';

-- Enable Row Level Security (RLS)
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE threads ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Allow public read access on categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access on threads" ON threads FOR SELECT USING (true);
CREATE POLICY "Allow public read access on posts" ON posts FOR SELECT USING (true);
CREATE POLICY "Allow public read access on users" ON users FOR SELECT USING (true);

-- Authenticated write access policies
CREATE POLICY "Allow authenticated insert on threads" ON threads FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated insert on posts" ON posts FOR INSERT WITH CHECK (auth.role() = 'authenticated');
