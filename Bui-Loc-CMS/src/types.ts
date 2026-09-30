export type PublishStatus = 'draft' | 'published' | 'scheduled' | 'private';

export type BlockType =
  | 'hero'
  | 'text'
  | 'richtext'
  | 'image'
  | 'gallery'
  | 'quote'
  | 'buttons'
  | 'columns'
  | 'divider'
  | 'spacer'
  | 'projects'
  | 'posts'
  | 'activities'
  | 'journey';

export interface ContentBlock {
  id: string;
  type: BlockType;
  title?: string;
  subtitle?: string;
  body?: string;
  imageUrl?: string;
  imageAlt?: string;
  images?: { url: string; alt?: string; caption?: string }[];
  quote?: string;
  attribution?: string;
  buttons?: { label: string; url: string; style?: 'primary' | 'secondary' | 'text' }[];
  columns?: { title?: string; body?: string; imageUrl?: string }[];
  align?: 'left' | 'center';
  width?: 'narrow' | 'wide' | 'full';
  background?: 'default' | 'soft' | 'accent' | 'dark';
  limit?: number;
}

export interface SeoFields {
  seoTitle?: string;
  seoDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
}

export interface BaseDocument extends SeoFields {
  id: string;
  slug: string;
  title: string;
  summary?: string;
  status: PublishStatus;
  isPublished?: boolean;
  publishedAt?: string;
  updatedAt?: string;
  createdAt?: string;
  author?: string;
  featuredImage?: string;
  featuredImageAlt?: string;
  tags?: string[];
}

export interface CmsPage extends BaseDocument {
  kind: 'page';
  template?: 'default' | 'editorial' | 'profile' | 'landing' | 'blank';
  parentSlug?: string;
  blocks: ContentBlock[];
  showInSitemap?: boolean;
}

export interface Post extends BaseDocument {
  kind: 'post';
  category?: string;
  content: string;
  blocks?: ContentBlock[];
  readTime?: string;
}

export interface Project extends BaseDocument {
  kind: 'project';
  projectStatus?: 'active' | 'paused' | 'completed' | 'archived';
  role?: string;
  period?: string;
  websiteUrl?: string;
  logoUrl?: string;
  content: string;
  blocks?: ContentBlock[];
  highlights?: string[];
}

export interface Activity extends BaseDocument {
  kind: 'activity';
  date?: string;
  location?: string;
  category?: string;
  content: string;
  gallery?: { url: string; alt?: string; caption?: string }[];
}

export interface JourneyItem {
  id: string;
  title: string;
  dateLabel: string;
  year?: string;
  description: string;
  url?: string;
  imageUrl?: string;
  isPublished?: boolean;
  sortOrder?: number;
}

export interface NavigationItem {
  id: string;
  label: string;
  url: string;
  visible: boolean;
  external?: boolean;
  children?: NavigationItem[];
}

export interface ThemeConfig {
  id?: string;
  primary: string;
  accent: string;
  background: string;
  surface: string;
  text: string;
  mutedText: string;
  border: string;
  darkBackground: string;
  darkSurface: string;
  darkText: string;
  fontHeading: string;
  fontBody: string;
  radius: number;
  containerWidth: number;
  cardShadow: 'none' | 'soft' | 'medium';
  motion: 'reduced' | 'normal' | 'expressive';
  visualMode?: 'cinematic' | 'editorial' | 'glass' | 'minimal';
  heroStyle?: 'portrait' | 'orbital' | 'editorial' | 'minimal';
  glowIntensity?: number;
  glassBlur?: number;
  grain?: boolean;
  grid?: boolean;
  pointerAura?: boolean;
  cardTilt?: boolean;
  marquee?: boolean;
}


export interface SiteConfig {
  id?: string;
  siteName: string;
  fullName: string;
  domain: string;
  tagline: string;
  intro: string;
  email: string;
  profileImage?: string;
  logoText: string;
  homepageBadge?: string;
  nowTitle?: string;
  nowText?: string;
  socialLinks: { label: string; url: string }[];
  footerText: string;
  contactTitle: string;
  contactText: string;
  defaultOgImage?: string;
  siteStatus?: 'active' | 'maintenance';
  maintenanceMessage?: string;
}

export interface FormField {
  id: string;
  type: 'text' | 'email' | 'tel' | 'textarea' | 'select' | 'checkbox';
  label: string;
  name: string;
  required?: boolean;
  placeholder?: string;
  options?: string[];
}

export interface FormDefinition {
  id: string;
  slug: string;
  title: string;
  description?: string;
  fields: FormField[];
  submitLabel?: string;
  successMessage?: string;
  isPublished?: boolean;
}

export interface RedirectRule {
  id: string;
  from: string;
  to: string;
  code: 301 | 302;
  enabled: boolean;
}

export interface ReusableBlock {
  id: string;
  name: string;
  block: ContentBlock;
  updatedAt?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'owner' | 'admin' | 'editor' | 'author';
  status: 'active' | 'inactive';
  createdAt?: string;
  lastLogin?: string;
}

export type CollectionName =
  | 'pages'
  | 'posts'
  | 'projects'
  | 'activities'
  | 'journey'
  | 'navigation'
  | 'forms'
  | 'redirects'
  | 'reusable_blocks';
