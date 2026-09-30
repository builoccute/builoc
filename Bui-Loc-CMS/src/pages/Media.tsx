import React,{useMemo,useState} from 'react';
import {ArrowUpRight,Image as ImageIcon,X} from 'lucide-react';
import {useCms,isPublic} from '../context/CmsContext';

type MediaItem={url:string;alt:string;caption:string;source:string;href?:string};
export const Media:React.FC<{navigate:(u:string)=>void}>=({navigate})=>{
 const c=useCms();const[active,setActive]=useState<MediaItem|null>(null);
 const items=useMemo(()=>{const out:MediaItem[]=[];const seen=new Set<string>();const add=(x:MediaItem)=>{if(!x.url||seen.has(x.url))return;seen.add(x.url);out.push(x)};
  c.projects.filter(isPublic).forEach(x=>x.featuredImage&&add({url:x.featuredImage,alt:x.featuredImageAlt||x.title,caption:x.title,source:'Dự án',href:`/du-an/${x.slug}`}));
  c.activities.filter(isPublic).forEach(x=>{if(x.featuredImage)add({url:x.featuredImage,alt:x.featuredImageAlt||x.title,caption:x.title,source:'Hoạt động',href:`/hoat-dong/${x.slug}`});(x.gallery||[]).forEach(g=>add({url:g.url,alt:g.alt||x.title,caption:g.caption||x.title,source:'Hoạt động',href:`/hoat-dong/${x.slug}`}))});
  c.posts.filter(isPublic).forEach(x=>x.featuredImage&&add({url:x.featuredImage,alt:x.featuredImageAlt||x.title,caption:x.title,source:'Bài viết',href:`/bai-viet/${x.slug}`}));
  c.pages.filter(isPublic).forEach(p=>(p.blocks||[]).forEach(b=>{if(b.type==='image'&&b.imageUrl)add({url:b.imageUrl,alt:b.imageAlt||b.title||'',caption:b.title||p.title,source:p.title,href:`/${p.slug}`});if(b.type==='gallery')(b.images||[]).forEach(g=>add({url:g.url,alt:g.alt||'',caption:g.caption||p.title,source:p.title,href:`/${p.slug}`}))}));return out.slice(0,60)},[c.projects,c.activities,c.posts,c.pages]);
 const go=(u?:string,e?:React.MouseEvent)=>{if(!u)return;if(e)e.preventDefault();navigate(u)};
 return <main className="media-page"><section className="media-hero"><div className="shell"><div className="eyebrow reveal"><ImageIcon size={13}/> Visual archive</div><h1 className="reveal">Thư viện<br/><span className="gradient-word">hình ảnh.</span></h1><p className="reveal">Ảnh được lấy trực tiếp từ dự án, hoạt động, bài viết và các gallery đang công khai trong Bui Loc CMS.</p><div className="media-count reveal"><b>{String(items.length).padStart(2,'0')}</b><span>visuals đang hiển thị</span></div></div></section>
  <section className="shell media-masonry">{items.length?items.map((x,i)=><button className={`media-tile reveal media-tile-${i%7}`} key={x.url} onClick={()=>setActive(x)}><img src={x.url} alt={x.alt} loading="lazy"/><span><small>{x.source}</small><b>{x.caption}</b></span></button>):<div className="media-empty"><ImageIcon size={38}/><h2>Chưa có ảnh công khai</h2><p>Khi dự án, hoạt động hoặc gallery có ảnh, chúng sẽ tự xuất hiện tại đây.</p></div>}</section>
  {active&&<div className="lightbox" role="dialog" aria-modal="true" onMouseDown={()=>setActive(null)}><button className="lightbox-close" onClick={()=>setActive(null)} aria-label="Đóng"><X/></button><div className="lightbox-inner" onMouseDown={e=>e.stopPropagation()}><img src={active.url} alt={active.alt}/><footer><div><span>{active.source}</span><h2>{active.caption}</h2></div>{active.href&&<a href={active.href} onClick={e=>{setActive(null);go(active.href,e)}}>Mở nội dung <ArrowUpRight size={16}/></a>}</footer></div></div>}
 </main>
}
