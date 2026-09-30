import React,{useEffect,useMemo,useState} from 'react';
import {ArrowUp,FileText,FolderKanban,Image as ImageIcon,Search,Sparkles,X} from 'lucide-react';
import {useCms,isPublic} from '../context/CmsContext';

export function AmbientUI(){
 const c=useCms();const [progress,setProgress]=useState(0),[palette,setPalette]=useState(false),[query,setQuery]=useState(''),[showTop,setShowTop]=useState(false);
 const commands=useMemo(()=>[
  {label:'Trang chủ',hint:'Bui Loc',url:'/',icon:Sparkles},{label:'Giới thiệu',hint:'Digital portrait',url:'/gioi-thieu',icon:FileText},{label:'Dự án',hint:'Selected work',url:'/du-an',icon:FolderKanban},{label:'Thư viện',hint:'Visual archive',url:'/thu-vien',icon:ImageIcon},{label:'Bài viết',hint:'Notes',url:'/bai-viet',icon:FileText},{label:'Dịch vụ',hint:'Personal services',url:'/dich-vu',icon:Sparkles},
  ...c.projects.filter(isPublic).slice(0,5).map(x=>({label:x.title,hint:'Dự án',url:`/du-an/${x.slug}`,icon:FolderKanban})),...c.posts.filter(isPublic).slice(0,5).map(x=>({label:x.title,hint:'Bài viết',url:`/bai-viet/${x.slug}`,icon:FileText}))
 ],[c.projects,c.posts]);
 const shown=commands.filter(x=>`${x.label} ${x.hint}`.toLowerCase().includes(query.toLowerCase())).slice(0,10);
 useEffect(()=>{
  let raf=0;const root=document.documentElement;
  root.dataset.visual=c.theme.visualMode||'cinematic';root.dataset.hero=c.theme.heroStyle||'orbital';root.dataset.motion=c.theme.motion||'expressive';
  root.style.setProperty('--glow-strength',String((c.theme.glowIntensity??72)/100));root.style.setProperty('--glass-blur',`${c.theme.glassBlur??18}px`);
  root.dataset.grain=c.theme.grain===false?'off':'on';root.dataset.grid=c.theme.grid===false?'off':'on';root.dataset.pointer=c.theme.pointerAura===false?'off':'on';root.dataset.tilt=c.theme.cardTilt===false?'off':'on';root.dataset.marquee=c.theme.marquee===false?'off':'on';
  const onScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;setProgress(max>0?Math.min(1,scrollY/max):0);setShowTop(scrollY>650)};
  const onPointer=(e:PointerEvent)=>{if(c.theme.pointerAura===false&&c.theme.cardTilt===false)return;cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{root.style.setProperty('--pointer-x',`${e.clientX}px`);root.style.setProperty('--pointer-y',`${e.clientY}px`);root.style.setProperty('--mx',`${(e.clientX/innerWidth-.5).toFixed(3)}`);root.style.setProperty('--my',`${(e.clientY/innerHeight-.5).toFixed(3)}`)})};
  const onMove=(e:MouseEvent)=>{const target=(e.target as HTMLElement)?.closest?.('.magnetic') as HTMLElement|null;if(!target)return;const r=target.getBoundingClientRect();target.style.setProperty('--mag-x',`${(e.clientX-r.left-r.width/2)*.12}px`);target.style.setProperty('--mag-y',`${(e.clientY-r.top-r.height/2)*.12}px`)};
  const onOut=(e:MouseEvent)=>{const target=(e.target as HTMLElement)?.closest?.('.magnetic') as HTMLElement|null;if(target){target.style.setProperty('--mag-x','0px');target.style.setProperty('--mag-y','0px')}};
  const onKey=(e:KeyboardEvent)=>{if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();setPalette(v=>!v)}if(e.key==='Escape')setPalette(false)};
  onScroll();addEventListener('scroll',onScroll,{passive:true});addEventListener('pointermove',onPointer,{passive:true});document.addEventListener('mousemove',onMove,{passive:true});document.addEventListener('mouseout',onOut,{passive:true});addEventListener('keydown',onKey);
  return()=>{cancelAnimationFrame(raf);removeEventListener('scroll',onScroll);removeEventListener('pointermove',onPointer);document.removeEventListener('mousemove',onMove);document.removeEventListener('mouseout',onOut);removeEventListener('keydown',onKey)}
 },[c.theme]);
 const go=(url:string)=>{setPalette(false);setQuery('');history.pushState({},'',url);dispatchEvent(new Event('popstate'));scrollTo({top:0,behavior:'smooth'})};
 return <><div className="scroll-progress" style={{transform:`scaleX(${progress})`}}/><div className="pointer-aura" aria-hidden="true"/><div className="ambient-grid" aria-hidden="true"/><div className="ambient-noise" aria-hidden="true"/><div className="ambient-beam" aria-hidden="true"/>{showTop&&<button className="back-to-top" onClick={()=>scrollTo({top:0,behavior:'smooth'})} aria-label="Lên đầu trang"><ArrowUp size={17}/></button>}<button className="command-trigger" onClick={()=>setPalette(true)}><Search size={14}/><span>Khám phá</span><kbd>Ctrl K</kbd></button>{palette&&<div className="command-overlay" onMouseDown={()=>setPalette(false)}><section className="command-palette" onMouseDown={e=>e.stopPropagation()}><header><Search size={18}/><input autoFocus value={query} onChange={e=>setQuery(e.target.value)} placeholder="Tìm trang, dự án, bài viết…"/><button onClick={()=>setPalette(false)}><X size={17}/></button></header><div className="command-results">{shown.map((x,i)=>{const Icon=x.icon;return <button key={`${x.url}-${i}`} onClick={()=>go(x.url)}><Icon size={17}/><span><b>{x.label}</b><small>{x.hint}</small></span><i>↗</i></button>})}{!shown.length&&<p>Không tìm thấy nội dung phù hợp.</p>}</div><footer><span>ESC để đóng</span><span>Bui Loc · Quick navigation</span></footer></section></div>}</>
}
