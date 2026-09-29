import React,{useState} from 'react';
import {Menu,X,ArrowUpRight,Search} from 'lucide-react';
import {useCms} from '../context/CmsContext';

export const Header:React.FC<{navigate:(url:string)=>void}>=({navigate})=>{
 const {site,navigation}=useCms(); const [open,setOpen]=useState(false);
 const items=navigation.filter(x=>x.visible);
 const go=(u:string,e?:React.MouseEvent)=>{if(e)e.preventDefault();setOpen(false); if(/^https?:/i.test(u))window.open(u,'_blank','noopener,noreferrer'); else navigate(u)};
 return <header className="site-header"><div className="shell header-inner">
   <a className="brand" href="/" onClick={e=>go('/',e)} aria-label="Bui Loc - Trang chủ"><span className="brand-mark">BL</span><span className="brand-name">{site.logoText||'Bui Loc'}</span></a>
   <nav className="desktop-nav">{items.map(x=><a key={x.id} href={x.url} onClick={e=>go(x.url,e)}>{x.label}</a>)}</nav>
   <div className="header-actions"><button className="icon-button" onClick={()=>navigate('/tim-kiem')} title="Tìm kiếm"><Search size={18}/></button><a className="admin-link" href="/admin">Admin <ArrowUpRight size={14}/></a><button className="menu-button" onClick={()=>setOpen(v=>!v)}>{open?<X/>:<Menu/>}</button></div>
 </div>{open&&<div className="mobile-nav">{items.map(x=><a key={x.id} href={x.url} onClick={e=>go(x.url,e)}>{x.label}</a>)}</div>}</header>
}
