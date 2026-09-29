import { Activity, CmsPage, FormDefinition, JourneyItem, NavigationItem, Post, Project, SiteConfig, ThemeConfig } from '../types';

export const DEFAULT_SITE: SiteConfig = {
  siteName: 'BUILOC',
  fullName: 'Bùi Tấn Lộc',
  domain: 'builoc.name.vn',
  logoText: 'BUILOC',
  tagline: 'Học hỏi, xây dựng và tạo ra những điều có ích.',
  intro: 'Không gian cá nhân của Bùi Tấn Lộc — nơi tập hợp những dự án đang xây dựng, hoạt động cộng đồng, sản phẩm số, bài viết và các dấu mốc đáng nhớ trên hành trình trưởng thành.',
  email: '',
  homepageBadge: 'BÙI TẤN LỘC · PERSONAL WEBSITE',
  nowTitle: 'Hiện tại',
  nowText: 'Tập trung vào giáo dục, phát triển cộng đồng, trải nghiệm số và những hệ thống có thể tạo ra giá trị lâu dài cho người trẻ.',
  socialLinks: [
    { label: 'Facebook', url: 'https://www.facebook.com/skyfirstnetwork/' },
    { label: 'Sky First Network', url: 'https://skyfirst.io.vn' }
  ],
  footerText: '© 2026 BUILOC · Bùi Tấn Lộc. Một không gian để lưu lại hành trình học, làm và xây dựng.',
  contactTitle: 'Kết nối',
  contactText: 'Bạn có một lời nhắn, ý tưởng hợp tác hoặc muốn trao đổi về một dự án? Hãy gửi nội dung qua biểu mẫu bên dưới.',
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
      { id: 'about-hero', type: 'hero', title: 'Bùi Tấn Lộc', subtitle: 'Giáo dục · Cộng đồng · Công nghệ · Sáng tạo', body: 'Mình thích biến những ý tưởng còn nằm trên giấy thành dự án có thể vận hành thật. BUILOC là nơi mình lưu lại những gì đang xây dựng, những điều đã học được và những dấu mốc muốn mang theo thật lâu.', background: 'soft' },
      { id: 'about-text', type: 'richtext', title: 'Mình quan tâm đến điều gì?', body: '<p>Mình dành nhiều sự quan tâm cho giáo dục, hoạt động cộng đồng, truyền thông và cách công nghệ có thể giúp một ý tưởng nhỏ trở thành một hệ thống rõ ràng, dễ tiếp cận và có khả năng phát triển lâu dài.</p><p>Website này không cố kể mọi thứ. Nó chọn giữ lại những dự án, trải nghiệm, bài viết và dấu mốc có ý nghĩa — đủ để nhìn thấy một hành trình đang tiếp tục được viết.</p>', width: 'narrow' }
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
    summary: 'Mạng lưới hướng đến các hoạt động giáo dục, phát triển người trẻ, tình nguyện và cộng đồng.', projectStatus: 'active', role: 'Sáng lập / vận hành', period: '2026 — hiện tại', websiteUrl: 'https://skyfirst.io.vn',
    content: '<p>Sky First Network là dự án được xây dựng xoay quanh giáo dục, phát triển người trẻ, tình nguyện và cộng đồng. Từ các lớp học, hoạt động kết nối đến những hệ thống số phục vụ vận hành, mục tiêu là tạo nên một không gian nơi người trẻ có thể học, thử sức và cùng tạo ra giá trị.</p>',
    highlights: ['Giáo dục & đào tạo', 'Phát triển cộng đồng', 'Hệ thống số']
  },
  {
    id: 'project-sfec', slug: 'sfec', title: 'The Sky First English Club', kind: 'project', status: 'published', isPublished: true,
    summary: 'Không gian học tập tiếng Anh hướng đến trải nghiệm gần gũi, thực hành và kết nối cộng đồng.', projectStatus: 'active', websiteUrl: 'https://sfec.skyfirst.io.vn', content: '<p>Dự án tiếng Anh với định hướng học tập và cộng đồng.</p>'
  },
  {
    id: 'project-nhn', slug: 'nha-han-ngu', title: 'Nhà Hán Ngữ', kind: 'project', status: 'published', isPublished: true,
    summary: 'Không gian nội dung và học tập tiếng Trung được xây dựng theo hướng dễ tiếp cận và có hệ thống.', projectStatus: 'active', websiteUrl: 'https://nhahanngu.io.vn', content: '<p>Một dự án tập trung vào nội dung và trải nghiệm học tiếng Trung.</p>'
  },
  {
    id: 'project-slc', slug: 'slc', title: 'SLC', kind: 'project', status: 'published', isPublished: true,
    summary: 'Nền tảng lớp học trực tuyến được phát triển để trải nghiệm học không chỉ dừng ở một phòng họp video.', projectStatus: 'active', websiteUrl: 'https://slc.skyfirst.io.vn', content: '<p>Nền tảng học trực tuyến và trải nghiệm lớp học số.</p>'
  }
];

export const DEFAULT_POSTS: Post[] = [
  {
    id: 'post-welcome', slug: 'bat-dau-tu-mot-khong-gian-rieng', title: 'Bắt đầu từ một không gian riêng', kind: 'post', status: 'published', isPublished: true,
    summary: 'Vì sao website này được xây như một hệ thống có thể phát triển lâu dài, thay vì chỉ là một trang giới thiệu.',
    category: 'Ghi chép', author: 'Bùi Tấn Lộc', readTime: '3 phút', publishedAt: '2026-09-29',
    content: '<p>Mình muốn một website cá nhân không chỉ là vài dòng giới thiệu rồi đứng yên. Nó cần đủ linh hoạt để lớn lên cùng những dự án, bài viết và trải nghiệm mới.</p><p>Vì vậy BUILOC được xây như một hệ thống nội dung thực thụ: có CMS riêng, quản lý trang, bài viết, dự án, media, biểu mẫu, giao diện và nhiều thành phần khác. Phần nhìn thấy bên ngoài chỉ là một lát cắt; phía sau là nơi mọi nội dung có thể tiếp tục được viết, chỉnh sửa và phát triển.</p>'
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
