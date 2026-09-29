import { Activity, CmsPage, FormDefinition, JourneyItem, NavigationItem, Post, Project, SiteConfig, ThemeConfig } from '../types';

export const DEFAULT_SITE: SiteConfig = {
  siteName: 'Bui Loc',
  fullName: 'Bùi Tấn Lộc',
  domain: 'builoc.name.vn',
  logoText: 'Bui Loc',
  tagline: 'Dự án, hoạt động và những điều đang được xây dựng.',
  intro: 'Một không gian cá nhân để lưu lại các dự án, hoạt động, bài viết và hành trình theo cách gọn gàng, có chủ đích và không phô bày đời tư.',
  email: 'support@skyfirst.io.vn',
  homepageBadge: 'Personal website · updated continuously',
  nowTitle: 'Hiện tại',
  nowText: 'Tập trung vào giáo dục, cộng đồng, sản phẩm số và việc xây dựng các hệ thống có thể vận hành lâu dài.',
  socialLinks: [
    { label: 'Facebook', url: 'https://www.facebook.com/skyfirstnetwork/' },
    { label: 'Sky First Network', url: 'https://skyfirst.io.vn' }
  ],
  footerText: '© 2026 Bui Loc. Nội dung công khai được chọn lọc có chủ đích.',
  contactTitle: 'Kết nối',
  contactText: 'Có thể liên hệ qua các kênh công khai được hiển thị trên website.',
  siteStatus: 'active'
};

export const DEFAULT_THEME: ThemeConfig = {
  primary: '#1268F3',
  accent: '#00A6FF',
  background: '#F7F9FC',
  surface: '#FFFFFF',
  text: '#0B1220',
  mutedText: '#64748B',
  border: '#E2E8F0',
  darkBackground: '#07111F',
  darkSurface: '#0E1B2D',
  darkText: '#F8FAFC',
  fontHeading: 'Inter, ui-sans-serif, system-ui, sans-serif',
  fontBody: 'Inter, ui-sans-serif, system-ui, sans-serif',
  radius: 22,
  containerWidth: 1180,
  cardShadow: 'soft',
  motion: 'normal'
};

export const DEFAULT_NAV: NavigationItem[] = [
  { id: 'home', label: 'Trang chủ', url: '/', visible: true },
  { id: 'about', label: 'Giới thiệu', url: '/gioi-thieu', visible: true },
  { id: 'projects', label: 'Dự án', url: '/du-an', visible: true },
  { id: 'activities', label: 'Hoạt động', url: '/hoat-dong', visible: true },
  { id: 'journey', label: 'Hành trình', url: '/hanh-trinh', visible: true },
  { id: 'posts', label: 'Bài viết', url: '/bai-viet', visible: true },
  { id: 'services', label: 'Dịch vụ', url: '/dich-vu', visible: true },
  { id: 'contact', label: 'Liên hệ', url: '/lien-he', visible: true }
];

export const DEFAULT_PAGES: CmsPage[] = [

  {
    id: 'page-services', slug: 'dich-vu', title: 'Dịch vụ cá nhân', kind: 'page', status: 'published', isPublished: true,
    summary: 'Một số nhóm công việc cá nhân có thể trao đổi. Toàn bộ nội dung chỉ là dữ liệu demo và có thể chỉnh trong BUILOC CMS.', template: 'editorial', showInSitemap: true,
    blocks: [
      { id: 'services-hero', type: 'hero', title: 'Dịch vụ cá nhân', subtitle: 'Thiết kế · Truyền thông · Website · Nội dung', body: 'Trang demo để giới thiệu các nhóm công việc cá nhân. Nội dung, phạm vi và cách liên hệ có thể chỉnh hoàn toàn trong CMS.', background: 'soft' },
      { id: 'services-intro', type: 'richtext', title: 'Có thể trao đổi', body: '<p><strong>Thiết kế truyền thông:</strong> poster, banner, social post và bộ ấn phẩm cơ bản.</p><p><strong>Website & hệ thống số:</strong> landing page, website giới thiệu, biểu mẫu và luồng nội dung.</p><p><strong>Nội dung:</strong> biên tập bài đăng, tài liệu, slide và cấu trúc thông tin.</p><p><em>Đây là nội dung mẫu. Hãy chỉnh lại phạm vi phù hợp trước khi công khai nhận dịch vụ.</em></p>', width: 'narrow' },
      { id: 'services-cta', type: 'buttons', title: 'Trao đổi nhu cầu', buttons: [{ label: 'Liên hệ', url: '/lien-he', style: 'primary' }] }
    ]
  },
  {
    id: 'page-about', slug: 'gioi-thieu', title: 'Giới thiệu', kind: 'page', status: 'published', isPublished: true,
    summary: 'Một phần giới thiệu vừa đủ về Bui Loc, tập trung vào công việc và những điều đang xây dựng.',
    template: 'profile', showInSitemap: true,
    blocks: [
      { id: 'about-hero', type: 'hero', title: 'Bui Loc', subtitle: 'Dự án · Giáo dục · Cộng đồng · Sản phẩm số', body: 'Website này không phải một bản lý lịch đầy đủ. Đây là nơi tập hợp những công việc, dự án, bài viết và dấu mốc mà mình chủ động chọn để công khai.', background: 'soft' },
      { id: 'about-text', type: 'richtext', title: 'Mình quan tâm đến điều gì?', body: '<p>Mình quan tâm đến cách công nghệ có thể giúp các dự án giáo dục và cộng đồng vận hành rõ ràng hơn, bền vững hơn và dễ tiếp cận hơn.</p><p>Những thông tin đời tư không cần thiết được chủ động giữ ngoài phạm vi website.</p>', width: 'narrow' }
    ]
  },
  {
    id: 'page-now', slug: 'now', title: 'Now', kind: 'page', status: 'published', isPublished: true,
    summary: 'Những điều đang được tập trung ở thời điểm hiện tại.', template: 'editorial', showInSitemap: true,
    blocks: [
      { id: 'now-hero', type: 'hero', title: 'Now', subtitle: 'Những điều đang được tập trung', body: 'Trang này có thể được cập nhật thường xuyên từ khu vực quản trị mà không cần sửa source code.' },
      { id: 'now-text', type: 'text', title: 'Hiện tại', body: 'Xây dựng Sky First Network, các dự án giáo dục liên quan, hệ thống số và nội dung có giá trị dài hạn.' }
    ]
  }
];

export const DEFAULT_PROJECTS: Project[] = [
  {
    id: 'project-sfn', slug: 'sky-first-network', title: 'Sky First Network', kind: 'project', status: 'published', isPublished: true,
    summary: 'Mạng lưới tập trung vào giáo dục, phát triển cộng đồng và người trẻ.', projectStatus: 'active', role: 'Sáng lập / vận hành', period: '2026 — hiện tại', websiteUrl: 'https://skyfirst.io.vn',
    content: '<p>Một dự án đang được xây dựng theo hướng hệ sinh thái giáo dục và cộng đồng. Trang chi tiết có thể được chỉnh hoàn toàn trong CMS.</p>',
    highlights: ['Giáo dục & đào tạo', 'Phát triển cộng đồng', 'Hệ thống số']
  },
  {
    id: 'project-sfec', slug: 'sfec', title: 'The Sky First English Club', kind: 'project', status: 'published', isPublished: true,
    summary: 'Không gian học và hoạt động tiếng Anh thuộc hệ sinh thái Sky First.', projectStatus: 'active', websiteUrl: 'https://sfec.skyfirst.io.vn', content: '<p>Dự án tiếng Anh với định hướng học tập và cộng đồng.</p>'
  },
  {
    id: 'project-nhn', slug: 'nha-han-ngu', title: 'Nhà Hán Ngữ', kind: 'project', status: 'published', isPublished: true,
    summary: 'Dự án nội dung và học tập tiếng Trung.', projectStatus: 'active', websiteUrl: 'https://nhahanngu.io.vn', content: '<p>Một dự án tập trung vào nội dung và trải nghiệm học tiếng Trung.</p>'
  },
  {
    id: 'project-slc', slug: 'slc', title: 'SLC', kind: 'project', status: 'published', isPublished: true,
    summary: 'Nền tảng lớp học trực tuyến đang được phát triển.', projectStatus: 'active', websiteUrl: 'https://slc.skyfirst.io.vn', content: '<p>Nền tảng học trực tuyến và trải nghiệm lớp học số.</p>'
  }
];

export const DEFAULT_POSTS: Post[] = [
  {
    id: 'post-welcome', slug: 'bat-dau-tu-mot-khong-gian-rieng', title: 'Bắt đầu từ một không gian riêng', kind: 'post', status: 'published', isPublished: true,
    summary: 'Vì sao website này được xây như một hệ thống có thể phát triển lâu dài, thay vì chỉ là một trang giới thiệu.',
    category: 'Ghi chép', author: 'Bui Loc', readTime: '3 phút', publishedAt: '2026-09-29',
    content: '<p>Một website cá nhân không nhất thiết phải kể quá nhiều về đời tư. Nó có thể đơn giản là nơi ghi lại những thứ mình đang xây, những điều mình đã học và những nội dung muốn giữ lại lâu dài.</p><p>Vì vậy Bui Loc được thiết kế như một nền tảng có CMS riêng: nội dung, màu sắc, menu, trang, bài viết và media đều có thể quản trị trực tiếp trên website.</p>'
  }
];

export const DEFAULT_ACTIVITIES: Activity[] = [];
export const DEFAULT_JOURNEY: JourneyItem[] = [];

export const DEFAULT_FORMS: FormDefinition[] = [
  {
    id: 'form-contact', slug: 'lien-he', title: 'Liên hệ', description: 'Gửi một lời nhắn qua website.', isPublished: true, submitLabel: 'Gửi lời nhắn', successMessage: 'Đã gửi. Cảm ơn bạn đã liên hệ.',
    fields: [
      { id: 'f-name', type: 'text', label: 'Họ tên', name: 'name', required: true },
      { id: 'f-email', type: 'email', label: 'Email', name: 'email', required: true },
      { id: 'f-message', type: 'textarea', label: 'Nội dung', name: 'message', required: true }
    ]
  }
];
