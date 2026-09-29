import React,{useCallback,useEffect,useState} from 'react';
import {Header} from './components/Header';
import {Footer} from './components/Footer';
import {Home} from './pages/Home';
import {Listing} from './pages/Listing';
import {Detail} from './pages/Detail';
import {Journey} from './pages/Journey';
import {CustomPage} from './pages/CustomPage';
import {Contact} from './pages/Contact';
import {SearchPage} from './pages/SearchPage';
import {AdminApp} from './admin/AdminApp';
import {useCms} from './context/CmsContext';

function route(path:string){const p=path.replace(/^\/+|\/+$/g,'');const s=p.split('/').filter(Boolean);if(!s.length)return{type:'home'};if(s[0]==='admin')return{type:'admin'};if(s[0]==='du-an'&&s[1])return{type:'project',slug:decodeURIComponent(s.slice(1).join('/'))};if(s[0]==='du-an')return{type:'projects'};if(s[0]==='bai-viet'&&s[1])return{type:'post',slug:decodeURIComponent(s.slice(1).join('/'))};if(s[0]==='bai-viet')return{type:'posts'};if(s[0]==='hoat-dong'&&s[1])return{type:'activity',slug:decodeURIComponent(s.slice(1).join('/'))};if(s[0]==='hoat-dong')return{type:'activities'};if(s[0]==='hanh-trinh')return{type:'journey'};if(s[0]==='lien-he')return{type:'contact'};if(s[0]==='tim-kiem')return{type:'search'};return{type:'page',slug:decodeURIComponent(s.join('/'))}}

export default function App(){const c=useCms();const[path,setPath]=useState(location.pathname);const current=route(path);const navigate=useCallback((u:string)=>{if(/^https?:/i.test(u)){location.href=u;return}history.pushState({},'',u);setPath(location.pathname);scrollTo({top:0,behavior:'smooth'})},[]);
 useEffect(()=>{const fn=()=>setPath(location.pathname);addEventListener('popstate',fn);return()=>removeEventListener('popstate',fn)},[]);
 useEffect(()=>{const r=c.redirects.find(x=>x.enabled&&x.from===path);if(r){if(r.code===301||r.code===302)location.replace(r.to)}},[path,c.redirects]);
 useEffect(()=>{let title=c.site.siteName;let desc=c.site.tagline;const slug=(current as any).slug;if(current.type==='project'){const x=c.projects.find(y=>y.slug===slug);if(x){title=`${x.seoTitle||x.title} | ${c.site.siteName}`;desc=x.seoDescription||x.summary||desc}}else if(current.type==='post'){const x=c.posts.find(y=>y.slug===slug);if(x){title=`${x.seoTitle||x.title} | ${c.site.siteName}`;desc=x.seoDescription||x.summary||desc}}else if(current.type==='page'){const x=c.pages.find(y=>y.slug===slug);if(x){title=`${x.seoTitle||x.title} | ${c.site.siteName}`;desc=x.seoDescription||x.summary||desc}}else if(current.type!=='home')title=`${({projects:'Dự án',posts:'Bài viết',activities:'Hoạt động',journey:'Hành trình',contact:'Liên hệ',search:'Tìm kiếm'} as any)[current.type]||''} | ${c.site.siteName}`;document.title=title;let m=document.querySelector('meta[name="description"]');if(m)m.setAttribute('content',desc||'')},[path,c.site,c.pages,c.posts,c.projects]);
 if(current.type==='admin')return <AdminApp/>;
 if(c.site.siteStatus==='maintenance')return <div className="maintenance"><div><img className="maintenance-logo" src="/logo-bui-loc.png" alt="Bui Loc"/><h1>{c.site.siteName}</h1><p>{c.site.maintenanceMessage||'Website đang được cập nhật. Vui lòng quay lại sau.'}</p></div></div>;
 let page:React.ReactNode=<Home navigate={navigate}/>;if(current.type==='projects')page=<Listing kind="projects" navigate={navigate}/>;if(current.type==='posts')page=<Listing kind="posts" navigate={navigate}/>;if(current.type==='activities')page=<Listing kind="activities" navigate={navigate}/>;if(current.type==='project')page=<Detail kind="project" slug={(current as any).slug} navigate={navigate}/>;if(current.type==='post')page=<Detail kind="post" slug={(current as any).slug} navigate={navigate}/>;if(current.type==='activity')page=<Detail kind="activity" slug={(current as any).slug} navigate={navigate}/>;if(current.type==='journey')page=<Journey/>;if(current.type==='contact')page=<Contact/>;if(current.type==='search')page=<SearchPage navigate={navigate}/>;if(current.type==='page')page=<CustomPage slug={(current as any).slug} navigate={navigate}/>;
 return <div className="public-app"><Header navigate={navigate}/>{page}<Footer navigate={navigate}/></div>}
