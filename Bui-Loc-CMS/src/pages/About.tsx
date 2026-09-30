import React from 'react';
import {ArrowRight,ArrowUpRight,Compass,Layers3,PenTool,Sparkles} from 'lucide-react';
import {useCms,isPublic} from '../context/CmsContext';
import {BlockRenderer} from '../components/BlockRenderer';

export const About:React.FC<{navigate:(u:string)=>void}>=({navigate})=>{
 const c=useCms();
 const page=c.pages.find(x=>x.slug==='gioi-thieu'&&isPublic(x));
 const milestones=c.journey.filter(x=>x.isPublished!==false).sort((a,b)=>(a.sortOrder||0)-(b.sortOrder||0)).slice(-4);
 const go=(u:string,e:React.MouseEvent)=>{e.preventDefault();navigate(u)};
 if(!page)return <div className="shell not-found"><div className="eyebrow">404</div><h1>Chưa có trang giới thiệu</h1></div>;
 const rest=(page.blocks||[]).filter((_,i)=>i>0);
 return <main className="portrait-page about-portrait">
  <section className="portrait-page-hero"><div className="portrait-halo"/><div className="shell portrait-page-grid">
   <div className="reveal"><div className="eyebrow"><Sparkles size={13}/> Digital portrait · About</div><h1>Không chỉ là một<br/><span className="gradient-word">hồ sơ cá nhân.</span></h1><p>{page.summary||c.site.intro}</p><div className="button-row"><a className="button primary magnetic" href="/hanh-trinh" onClick={e=>go('/hanh-trinh',e)}>Xem hành trình <ArrowRight size={16}/></a><a className="button secondary" href="/lien-he" onClick={e=>go('/lien-he',e)}>Kết nối</a></div></div>
   <aside className="portrait-manifesto reveal delay-1"><span>BUI LOC · 2026</span><p>Học bằng cách làm. Ghi lại bằng hệ thống. Giữ những gì thật sự có ích.</p><i>BL</i></aside>
  </div></section>
  <section className="shell portrait-values"><article className="reveal"><Compass/><span>01</span><h3>Học & thử nghiệm</h3><p>Không gian này ghi lại quá trình học, thử, sửa và hoàn thiện thay vì chỉ trưng bày kết quả cuối.</p></article><article className="reveal delay-1"><Layers3/><span>02</span><h3>Xây hệ thống</h3><p>Từ nội dung đến sản phẩm số, mình quan tâm cách một ý tưởng có thể vận hành rõ ràng và lâu dài.</p></article><article className="reveal delay-2"><PenTool/><span>03</span><h3>Ghi chép có chọn lọc</h3><p>Chỉ những phần phù hợp để công khai mới xuất hiện, để website là chân dung số chứ không phải nhật ký đời tư.</p></article></section>
  <section className="about-story"><div className="shell"><div className="story-rail"><span>ABOUT / STORY</span><i/></div><div className="story-content"><BlockRenderer blocks={rest} navigate={navigate}/></div></div></section>
  {milestones.length>0&&<section className="shell portrait-milestones"><div className="section-head reveal"><div><div className="eyebrow">Selected milestones</div><h2>Một vài điểm trên đường đi.</h2></div><a href="/hanh-trinh" onClick={e=>go('/hanh-trinh',e)}>Xem toàn bộ <ArrowUpRight size={15}/></a></div><div>{milestones.map((x,i)=><article className="reveal" key={x.id}><b>{String(i+1).padStart(2,'0')}</b><span>{x.dateLabel}</span><h3>{x.title}</h3><p>{x.description}</p></article>)}</div></section>}
 </main>
}
