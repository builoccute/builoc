import React from 'react';
import {ArrowRight,ArrowUpRight,FileText,LayoutTemplate,MessagesSquare,PanelsTopLeft,PenTool,Sparkles} from 'lucide-react';
import {useCms,isPublic} from '../context/CmsContext';
import {BlockRenderer} from '../components/BlockRenderer';

const SERVICES=[
 {n:'01',icon:PenTool,title:'Thiết kế truyền thông',desc:'Poster, banner, social post, tài liệu sự kiện và hệ thống ấn phẩm có thứ bậc rõ ràng.'},
 {n:'02',icon:PanelsTopLeft,title:'Website & landing page',desc:'Từ sitemap, nội dung, CTA đến giao diện và khả năng tự quản trị sau khi bàn giao.'},
 {n:'03',icon:FileText,title:'Nội dung & tài liệu',desc:'Biên tập cấu trúc thông tin, slide, biểu mẫu và tài liệu để người đọc hiểu nhanh và dùng được.'},
 {n:'04',icon:LayoutTemplate,title:'Hệ thống số nhỏ',desc:'Gom form, dữ liệu và luồng vận hành rời rạc thành một trải nghiệm gọn, dễ theo dõi.'},
 {n:'05',icon:MessagesSquare,title:'Rà soát trải nghiệm',desc:'Nhìn lại luồng người dùng, nội dung và cách trình bày để tìm những điểm đang gây khó hiểu.'},
 {n:'06',icon:Sparkles,title:'Ý tưởng đặc thù',desc:'Có thể trao đổi các nhu cầu nằm giữa thiết kế, nội dung và công nghệ khi phạm vi đủ rõ.'}
];
export const Services:React.FC<{navigate:(u:string)=>void}>=({navigate})=>{
 const c=useCms();const page=c.pages.find(x=>x.slug==='dich-vu'&&isPublic(x));const go=(u:string,e:React.MouseEvent)=>{e.preventDefault();navigate(u)};
 const editable=(page?.blocks||[]).filter(b=>b.type!=='hero'&&b.type!=='buttons');
 return <main className="services-page">
  <section className="services-hero"><div className="service-beam"/><div className="shell"><div className="eyebrow reveal">Personal services · Bui Loc</div><h1 className="reveal">Từ một nhu cầu rời rạc<br/>đến một thứ <span className="gradient-word">dùng được thật.</span></h1><p className="reveal">{page?.summary||'Thiết kế, website, nội dung và hệ thống số nhỏ được bắt đầu từ mục tiêu, người sử dụng và cách vận hành sau khi bàn giao.'}</p><a className="button primary magnetic reveal" href="/lien-he" onClick={e=>go('/lien-he',e)}>Gửi yêu cầu trao đổi <ArrowRight size={16}/></a></div></section>
  <section className="shell services-grid">{SERVICES.map((s,i)=>{const Icon=s.icon;return <article className={`service-card reveal delay-${Math.min(i%3,2)}`} key={s.n}><div><span>{s.n}</span><Icon/></div><h2>{s.title}</h2><p>{s.desc}</p><i>Trao đổi theo phạm vi cụ thể</i></article>})}</section>
  <section className="service-process"><div className="shell"><div className="section-head reveal"><div><div className="eyebrow">Process</div><h2>Rõ trước khi đẹp.</h2></div></div><div className="process-line"><article className="reveal"><b>01</b><h3>Hiểu yêu cầu</h3><p>Mục tiêu, người dùng, dữ liệu đầu vào và giới hạn cần được nói rõ.</p></article><article className="reveal delay-1"><b>02</b><h3>Chốt phạm vi</h3><p>Xác định đầu việc, sản phẩm bàn giao và những phần không nằm trong phạm vi.</p></article><article className="reveal delay-2"><b>03</b><h3>Làm & kiểm tra</h3><p>Thiết kế hoặc xây dựng theo từng lớp, ưu tiên khả năng dùng và chỉnh sửa thực tế.</p></article><article className="reveal"><b>04</b><h3>Bàn giao rõ ràng</h3><p>Tệp, nội dung và hướng dẫn được sắp xếp để có thể tiếp tục sử dụng sau đó.</p></article></div></div></section>
  {editable.length>0&&<section className="service-editorial"><BlockRenderer blocks={editable} navigate={navigate}/></section>}
  <section className="shell service-cta reveal"><div><span>START A CONVERSATION</span><h2>Có một việc cần làm cho rõ?</h2><p>Gửi mục tiêu, thời hạn dự kiến và sản phẩm bạn cần. Mình sẽ xem phạm vi có phù hợp để trao đổi tiếp hay không.</p></div><a className="button primary magnetic" href="/lien-he" onClick={e=>go('/lien-he',e)}>Liên hệ Bui Loc <ArrowUpRight size={16}/></a></section>
 </main>
}
