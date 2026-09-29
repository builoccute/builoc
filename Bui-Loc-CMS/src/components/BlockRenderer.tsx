import React from 'react';
import {ArrowRight,ArrowUpRight,Quote} from 'lucide-react';
import {ContentBlock} from '../types';
import {useCms,isPublic} from '../context/CmsContext';

export const BlockRenderer:React.FC<{blocks:ContentBlock[];navigate:(url:string)=>void}>=({blocks,navigate})=>{const{projects,posts,activities,journey}=useCms();const go=(u:string,e:React.MouseEvent)=>{if(u.startsWith('/')){e.preventDefault();navigate(u)}};return <div className="blocks">{blocks.map(b=>{
 const cls=`block block-${b.type} bg-${b.background||'default'} width-${b.width||'wide'} align-${b.align||'left'}`;
 if(b.type==='hero')return <section key={b.id} className={cls}><div className="block-inner">{b.subtitle&&<div className="eyebrow">{b.subtitle}</div>}<h1>{b.title}</h1>{b.body&&<p className="hero-body">{b.body}</p>}{b.buttons?.length?<div className="button-row">{b.buttons.map((x,i)=><a key={i} className={`button ${x.style||'primary'}`} href={x.url} onClick={e=>go(x.url,e)}>{x.label}<ArrowRight size={16}/></a>)}</div>:null}</div></section>;
 if(b.type==='text')return <section key={b.id} className={cls}><div className="block-inner">{b.title&&<h2>{b.title}</h2>}{b.subtitle&&<div className="eyebrow">{b.subtitle}</div>}{b.body&&<p className="lead-copy">{b.body}</p>}</div></section>;
 if(b.type==='richtext')return <section key={b.id} className={cls}><div className="block-inner">{b.title&&<h2>{b.title}</h2>}<div className="rich" dangerouslySetInnerHTML={{__html:b.body||''}}/></div></section>;
 if(b.type==='image')return <section key={b.id} className={cls}><div className="block-inner"><figure>{b.imageUrl&&<img src={b.imageUrl} alt={b.imageAlt||b.title||''}/>} {b.title&&<figcaption>{b.title}</figcaption>}</figure></div></section>;
 if(b.type==='gallery')return <section key={b.id} className={cls}><div className="block-inner">{b.title&&<h2>{b.title}</h2>}<div className="gallery-grid">{(b.images||[]).map((x,i)=><figure key={i}><img src={x.url} alt={x.alt||''}/>{x.caption&&<figcaption>{x.caption}</figcaption>}</figure>)}</div></div></section>;
 if(b.type==='quote')return <section key={b.id} className={cls}><div className="block-inner"><blockquote><Quote size={32}/><p>{b.quote||b.body}</p>{b.attribution&&<cite>{b.attribution}</cite>}</blockquote></div></section>;
 if(b.type==='buttons')return <section key={b.id} className={cls}><div className="block-inner"><div className="button-row">{(b.buttons||[]).map((x,i)=><a key={i} className={`button ${x.style||'secondary'}`} href={x.url} onClick={e=>go(x.url,e)}>{x.label}<ArrowUpRight size={15}/></a>)}</div></div></section>;
 if(b.type==='columns')return <section key={b.id} className={cls}><div className="block-inner">{b.title&&<h2>{b.title}</h2>}<div className="columns-grid">{(b.columns||[]).map((c,i)=><article key={i} className="column-card">{c.imageUrl&&<img src={c.imageUrl} alt=""/>}<h3>{c.title}</h3><p>{c.body}</p></article>)}</div></div></section>;
 if(b.type==='divider')return <div key={b.id} className="shell"><hr/></div>;
 if(b.type==='spacer')return <div key={b.id} style={{height:64}}/>;
 if(b.type==='projects')return <Feed key={b.id} title={b.title||'Dự án'} items={projects.filter(isPublic).slice(0,b.limit||6).map(x=>({id:x.id,title:x.title,summary:x.summary,url:`/du-an/${x.slug}`,meta:x.projectStatus||''}))} navigate={navigate}/>;
 if(b.type==='posts')return <Feed key={b.id} title={b.title||'Bài viết'} items={posts.filter(isPublic).slice(0,b.limit||6).map(x=>({id:x.id,title:x.title,summary:x.summary,url:`/bai-viet/${x.slug}`,meta:x.category||''}))} navigate={navigate}/>;
 if(b.type==='activities')return <Feed key={b.id} title={b.title||'Hoạt động'} items={activities.filter(isPublic).slice(0,b.limit||6).map(x=>({id:x.id,title:x.title,summary:x.summary,url:`/hoat-dong/${x.slug}`,meta:x.date||''}))} navigate={navigate}/>;
 if(b.type==='journey')return <section key={b.id} className={cls}><div className="block-inner"><h2>{b.title||'Hành trình'}</h2><div className="timeline">{journey.filter(x=>x.isPublished!==false).sort((a,b)=>(a.sortOrder||0)-(b.sortOrder||0)).slice(0,b.limit||8).map(x=><article key={x.id}><span>{x.dateLabel}</span><h3>{x.title}</h3><p>{x.description}</p></article>)}</div></div></section>;
 return null;
})}</div>}

const Feed:React.FC<{title:string;items:{id:string;title:string;summary?:string;url:string;meta?:string}[];navigate:(url:string)=>void}>=({title,items,navigate})=><section className="block width-wide"><div className="block-inner"><div className="section-head"><h2>{title}</h2></div><div className="feed-grid">{items.map(x=><a className="feed-card" key={x.id} href={x.url} onClick={e=>{e.preventDefault();navigate(x.url)}}><div className="feed-meta">{x.meta}</div><h3>{x.title}</h3><p>{x.summary}</p><span>Xem thêm <ArrowRight size={14}/></span></a>)}</div></div></section>;
