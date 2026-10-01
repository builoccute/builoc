import React from 'react';
import {ArrowRight,ArrowUpRight,FileText,LayoutTemplate,MessagesSquare,PanelsTopLeft,PenTool,Sparkles} from 'lucide-react';
import {useCms,isPublic} from '../context/CmsContext';
import {BlockRenderer} from '../components/BlockRenderer';

const SERVICES=[
 {n:'01',icon:PanelsTopLeft,title:'Website & landing page',desc:'Trang cá nhân, dự án, chương trình, lớp học hoặc chiến dịch; có thể đi từ cấu trúc nội dung đến giao diện và phần quản trị.',tag:'Có phí'},
 {n:'02',icon:PenTool,title:'Thiết kế truyền thông',desc:'Poster, banner, ảnh bài đăng, tài liệu sự kiện và bộ mẫu cơ bản, ưu tiên dễ đọc và sử dụng nhất quán.',tag:'Có phí'},
 {n:'03',icon:FileText,title:'Biên tập nội dung website',desc:'Sắp xếp và viết lại nội dung giới thiệu, dự án, dịch vụ hoặc chương trình từ dữ kiện có thật.',tag:'Có phí'},
 {n:'04',icon:LayoutTemplate,title:'Biểu mẫu & hệ thống đăng ký',desc:'Thiết kế luồng đăng ký, câu hỏi, dữ liệu đầu vào và cách tổng hợp để giảm thao tác thủ công.',tag:'Có phí'},
 {n:'05',icon:Sparkles,title:'Nhận diện dự án cơ bản',desc:'Gợi ý cách dùng logo, kiểu trình bày, template và quy tắc hình ảnh cho dự án nhỏ hoặc nhóm mới bắt đầu.',tag:'Có phí'},
 {n:'06',icon:MessagesSquare,title:'Rà soát trải nghiệm website',desc:'Xem lại cấu trúc, luồng người dùng, nội dung, nút hành động và những chỗ đang gây khó hiểu.',tag:'Có phí / trao đổi'},
 {n:'07',icon:LayoutTemplate,title:'Số hóa quy trình nhỏ',desc:'Gom những bảng, form và đường dẫn rời rạc thành quy trình gọn hơn, phù hợp với cách đội ngũ đang làm việc.',tag:'Có phí'},
 {n:'08',icon:FileText,title:'Tài liệu vận hành dự án',desc:'Hỗ trợ cấu trúc hướng dẫn, quy định, mô tả vị trí, checklist và tài liệu bàn giao để đội ngũ dễ phối hợp.',tag:'Có phí'},
 {n:'09',icon:MessagesSquare,title:'Tư vấn bắt đầu dự án',desc:'Trao đổi cách biến ý tưởng thành mục tiêu, nhóm việc, mốc triển khai và cách kiểm tra tiến độ thực tế.',tag:'Tư vấn'},
 {n:'10',icon:MessagesSquare,title:'Tư vấn cơ cấu nhân sự',desc:'Góp ý cách chia vai trò, nhiệm vụ, đầu mối phối hợp và phạm vi trách nhiệm cho nhóm hoặc câu lạc bộ.',tag:'Tư vấn'},
 {n:'11',icon:MessagesSquare,title:'Tư vấn tuyển thành viên',desc:'Góp ý vị trí cần tuyển, nội dung thông báo, form, tiêu chí sàng lọc và cách tổ chức trao đổi với ứng viên.',tag:'Tư vấn'},
 {n:'12',icon:MessagesSquare,title:'Tư vấn truyền thông dự án',desc:'Cùng xác định người đọc, thông điệp, kênh, lịch nội dung và cách trình bày thông tin dễ hiểu hơn.',tag:'Tư vấn'},
 {n:'13',icon:Sparkles,title:'Góp ý CV & hồ sơ',desc:'Xem nhanh cách sắp xếp thông tin, diễn đạt kinh nghiệm và những phần đang thiếu rõ ràng; không viết thành tích thay người gửi.',tag:'Hỗ trợ 0đ'},
 {n:'14',icon:LayoutTemplate,title:'Góp ý form tuyển thành viên',desc:'Kiểm tra câu hỏi, thứ tự, độ dài và dữ liệu cần thu để biểu mẫu dễ điền và dễ xử lý hơn.',tag:'Hỗ trợ 0đ'},
 {n:'15',icon:PanelsTopLeft,title:'Xem nhanh cấu trúc website',desc:'Góp ý bố cục, menu, nội dung chính và điểm người dùng có thể bị lạc đối với website nhỏ hoặc dự án trẻ.',tag:'Hỗ trợ 0đ'},
 {n:'16',icon:MessagesSquare,title:'Chia sẻ cách bắt đầu CLB/dự án',desc:'Trao đổi những bước đầu về mục tiêu, đội ngũ, tài liệu và cách tổ chức công việc ở quy mô nhỏ.',tag:'Hỗ trợ 0đ'},
 {n:'17',icon:MessagesSquare,title:'Góp ý hoạt động giáo dục – cộng đồng',desc:'Đọc và phản hồi kế hoạch ở góc độ trải nghiệm người tham gia, cách truyền đạt và khả năng vận hành.',tag:'Hỗ trợ 0đ'},
 {n:'18',icon:Sparkles,title:'Yêu cầu khác phù hợp',desc:'Nếu nhu cầu nằm giữa nội dung, thiết kế, website và vận hành, có thể gửi bối cảnh để cùng xác định cách hỗ trợ.',tag:'Trao đổi trước'}
];
export const Services:React.FC<{navigate:(u:string)=>void}>=({navigate})=>{
 const c=useCms();const page=c.pages.find(x=>x.slug==='dich-vu'&&isPublic(x));const go=(u:string,e:React.MouseEvent)=>{e.preventDefault();navigate(u)};
 const editable=(page?.blocks||[]).filter(b=>b.type!=='hero'&&b.type!=='buttons');
 return <main className="services-page">
  <section className="services-hero"><div className="service-beam"/><div className="shell"><div className="eyebrow reveal">Dịch vụ · Tư vấn · Hỗ trợ 0đ</div><h1 className="reveal">Có việc cần làm, có điều cần hỏi,<br/><span className="gradient-word">cứ bắt đầu từ nhu cầu thật.</span></h1><p className="reveal">{page?.summary||'Có công việc nhận làm theo phạm vi cụ thể, có nội dung tư vấn và có những hỗ trợ 0đ khi phù hợp với thời gian và khả năng.'}</p><a className="button primary magnetic reveal" href="/lien-he" onClick={e=>go('/lien-he',e)}>Gửi yêu cầu trao đổi <ArrowRight size={16}/></a></div></section>
  <section className="shell services-grid">{SERVICES.map((s,i)=>{const Icon=s.icon;return <article className={`service-card reveal delay-${Math.min(i%3,2)}`} key={s.n}><div><span>{s.n}</span><Icon/></div><h2>{s.title}</h2><p>{s.desc}</p><i>{s.tag}</i></article>})}</section>
  <section className="service-process"><div className="shell"><div className="section-head reveal"><div><div className="eyebrow">Cách làm việc</div><h2>Rõ trước khi bắt đầu.</h2></div></div><div className="process-line"><article className="reveal"><b>01</b><h3>Hiểu yêu cầu</h3><p>Mục tiêu, người dùng, dữ liệu đầu vào và giới hạn cần được nói rõ.</p></article><article className="reveal delay-1"><b>02</b><h3>Chốt phạm vi</h3><p>Xác định đầu việc, sản phẩm bàn giao và những phần không nằm trong phạm vi.</p></article><article className="reveal delay-2"><b>03</b><h3>Làm & kiểm tra</h3><p>Thiết kế hoặc xây dựng theo từng lớp, ưu tiên khả năng dùng và chỉnh sửa thực tế.</p></article><article className="reveal"><b>04</b><h3>Bàn giao rõ ràng</h3><p>Tệp, nội dung và hướng dẫn được sắp xếp để có thể tiếp tục sử dụng sau đó.</p></article></div></div></section>
  {editable.length>0&&<section className="service-editorial"><BlockRenderer blocks={editable} navigate={navigate}/></section>}
  <section className="shell service-cta reveal"><div><span>BẮT ĐẦU TRAO ĐỔI</span><h2>Có việc cần làm hoặc cần góp ý?</h2><p>Gửi bối cảnh, mục tiêu và điều bạn đang cần. Mình sẽ xác định rõ phần nào có thể nhận làm, tư vấn hoặc hỗ trợ 0đ trước khi tiếp tục.</p></div><a className="button primary magnetic" href="/lien-he" onClick={e=>go('/lien-he',e)}>Liên hệ Bui Loc <ArrowUpRight size={16}/></a></section>
 </main>
}
