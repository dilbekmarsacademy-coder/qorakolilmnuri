-- ============================================
-- ILM NURI Ta'lim Markazi — Supabase SQL Setup
-- Supabase Dashboard > SQL Editor ga paste qiling
-- ============================================

-- 1. Arizalar jadvali
CREATE TABLE IF NOT EXISTS applications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  phone text NOT NULL,
  course text,
  preferred_time text,
  message text,
  status text DEFAULT 'new' CHECK (status IN ('new','contacted','enrolled','rejected')),
  notes text,
  created_at timestamptz DEFAULT now()
);

-- 2. O'qituvchilar jadvali
CREATE TABLE IF NOT EXISTS teachers (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  subject text,
  experience text,
  score text,
  rating numeric(2,1) DEFAULT 5.0,
  students integer DEFAULT 0,
  cert text,
  bio text,
  gradient text DEFAULT 'linear-gradient(135deg,#1B4F8A,#2563EB)',
  image_url text DEFAULT '',
  display_order integer DEFAULT 0,
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- 3. O'quvchilar sharhlari
CREATE TABLE IF NOT EXISTS testimonials (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  name text NOT NULL,
  result text,
  university text,
  grant boolean DEFAULT true,
  year text,
  text text,
  gradient text DEFAULT 'linear-gradient(135deg,#1B4F8A,#2563EB)',
  image_url text DEFAULT '',
  active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- 4. Galereya
CREATE TABLE IF NOT EXISTS gallery_items (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  label text NOT NULL,
  category text DEFAULT 'Galereya',
  emoji text DEFAULT '📸',
  image_url text DEFAULT '',
  color text DEFAULT 'from-blue-400 to-blue-600',
  display_order integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- 5. Sayt sozlamalari
CREATE TABLE IF NOT EXISTS site_settings (
  key text PRIMARY KEY,
  value text DEFAULT ''
);

-- Boshlang'ich sozlamalar
INSERT INTO site_settings (key, value) VALUES
  ('phone', '+998 93 378-39-85'),
  ('phone2', ''),
  ('email', 'info@imnuri.uz'),
  ('address', 'Qorako''l shahri, Buxoro viloyati, O''zbekiston'),
  ('working_hours', 'Dushanba–Shanba: 08:00–20:00'),
  ('telegram', 'https://t.me/imnuri_markazi'),
  ('whatsapp', 'https://wa.me/998933783985'),
  ('instagram', 'https://instagram.com/imnuri.qorakol'),
  ('youtube', 'https://youtube.com/@imnuri'),
  ('map_embed', '')
ON CONFLICT (key) DO NOTHING;

-- 6. RLS (Row Level Security) — faqat autentifikatsiyalangan foydalanuvchilar
ALTER TABLE applications   ENABLE ROW LEVEL SECURITY;
ALTER TABLE teachers       ENABLE ROW LEVEL SECURITY;
ALTER TABLE testimonials   ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery_items  ENABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings  ENABLE ROW LEVEL SECURITY;

-- Arizalar: hammaga yozish, faqat adminlarga o'qish
CREATE POLICY "Public can insert applications" ON applications FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins can read applications"  ON applications FOR SELECT USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can update applications" ON applications FOR UPDATE USING (auth.role() = 'authenticated');
CREATE POLICY "Admins can delete applications" ON applications FOR DELETE USING (auth.role() = 'authenticated');

-- Qolganlar: faqat adminlar
CREATE POLICY "Admins manage teachers"     ON teachers      FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins manage testimonials" ON testimonials  FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins manage gallery"      ON gallery_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Admins manage settings"     ON site_settings FOR ALL USING (auth.role() = 'authenticated');

-- Public o'qish (sayt uchun)
CREATE POLICY "Public read teachers"       ON teachers      FOR SELECT USING (active = true);
CREATE POLICY "Public read testimonials"   ON testimonials  FOR SELECT USING (active = true);
CREATE POLICY "Public read gallery"        ON gallery_items FOR SELECT USING (true);
CREATE POLICY "Public read settings"       ON site_settings FOR SELECT USING (true);
