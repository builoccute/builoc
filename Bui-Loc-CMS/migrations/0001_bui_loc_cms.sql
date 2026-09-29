-- Bui Loc CMS / Cloudflare D1
CREATE TABLE IF NOT EXISTS website_cms_documents (
  collection_name TEXT NOT NULL,
  doc_id TEXT NOT NULL,
  data_json TEXT NOT NULL,
  is_published INTEGER NOT NULL DEFAULT 0,
  updated_at TEXT NOT NULL,
  updated_by TEXT,
  PRIMARY KEY(collection_name, doc_id)
);
CREATE INDEX IF NOT EXISTS idx_cms_collection_public ON website_cms_documents(collection_name,is_published,updated_at);
CREATE TABLE IF NOT EXISTS website_cms_revisions (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  collection_name TEXT NOT NULL,
  doc_id TEXT NOT NULL,
  data_json TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  created_by TEXT
);
CREATE TABLE IF NOT EXISTS website_admin_users (
  id TEXT PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'editor',
  status TEXT NOT NULL DEFAULT 'active',
  password_salt TEXT NOT NULL,
  password_hash TEXT NOT NULL,
  password_iterations INTEGER NOT NULL DEFAULT 180000,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  last_login TEXT,
  must_change_password INTEGER NOT NULL DEFAULT 0,
  password_changed_at TEXT
);
CREATE TABLE IF NOT EXISTS website_admin_sessions (
  token_hash TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  expires_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS website_admin_audit (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  actor_id TEXT,
  target_id TEXT,
  action TEXT NOT NULL,
  detail TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE IF NOT EXISTS website_form_submissions (
  id TEXT PRIMARY KEY,
  form_id TEXT NOT NULL,
  form_slug TEXT,
  data_json TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new',
  ip_hash TEXT,
  user_agent TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);
CREATE INDEX IF NOT EXISTS idx_form_submissions_form ON website_form_submissions(form_id,created_at);
