import React,{createContext,useContext,useEffect,useMemo,useState} from 'react';
import {getCollection,putDocument,deleteDocument} from '../api';
import {Activity,CmsPage,FormDefinition,JourneyItem,NavigationItem,Post,Project,RedirectRule,ReusableBlock,SiteConfig,ThemeConfig} from '../types';
import {DEFAULT_ACTIVITIES,DEFAULT_FORMS,DEFAULT_JOURNEY,DEFAULT_NAV,DEFAULT_PAGES,DEFAULT_POSTS,DEFAULT_PROJECTS,DEFAULT_SITE,DEFAULT_THEME} from '../data/defaults';

type State={
 site:SiteConfig;theme:ThemeConfig;pages:CmsPage[];posts:Post[];projects:Project[];activities:Activity[];journey:JourneyItem[];navigation:NavigationItem[];forms:FormDefinition[];redirects:RedirectRule[];reusableBlocks:ReusableBlock[];
 loading:boolean;refresh:()=>Promise<void>;
 saveSite:(x:SiteConfig)=>Promise<void>;saveTheme:(x:ThemeConfig)=>Promise<void>;
 saveDoc:(collection:string,doc:any)=>Promise<void>;removeDoc:(collection:string,id:string)=>Promise<void>;
 setLocalCollection:(collection:string,items:any[])=>void;
}
const C=createContext<State|null>(null);
const pub=(x:any)=>x?.isPublished!==false && x?.status!=='draft' && x?.status!=='private';
export const CmsProvider:React.FC<{children:React.ReactNode}>=({children})=>{
 const [site,setSite]=useState(DEFAULT_SITE),[theme,setTheme]=useState(DEFAULT_THEME),[pages,setPages]=useState(DEFAULT_PAGES),[posts,setPosts]=useState(DEFAULT_POSTS),[projects,setProjects]=useState(DEFAULT_PROJECTS),[activities,setActivities]=useState(DEFAULT_ACTIVITIES),[journey,setJourney]=useState(DEFAULT_JOURNEY),[navigation,setNavigation]=useState(DEFAULT_NAV),[forms,setForms]=useState(DEFAULT_FORMS),[redirects,setRedirects]=useState<RedirectRule[]>([]),[reusableBlocks,setReusableBlocks]=useState<ReusableBlock[]>([]),[loading,setLoading]=useState(true);
 const refresh=async()=>{setLoading(true);try{
  const [s,t,p,po,pr,a,j,n,f,r,b]=await Promise.all([
   getCollection<SiteConfig>('site_config'),getCollection<ThemeConfig>('theme_config'),getCollection<CmsPage>('pages'),getCollection<Post>('posts'),getCollection<Project>('projects'),getCollection<Activity>('activities'),getCollection<JourneyItem>('journey'),getCollection<NavigationItem>('navigation'),getCollection<FormDefinition>('forms'),getCollection<RedirectRule>('redirects'),getCollection<ReusableBlock>('reusable_blocks')
  ]);
  if(s[0]){const loaded:any={...DEFAULT_SITE,...s[0]};loaded.siteName='Bui Loc';loaded.logoText='Bui Loc';loaded.socialLinks=(loaded.socialLinks||[]).filter((x:any)=>x?.url&&!/(skyfirst\.io\.vn|facebook\.com\/skyfirstnetwork)/i.test(x.url));if(/@skyfirst\.io\.vn$/i.test(loaded.email||''))loaded.email='';if(!loaded.footerText||/Nội dung được chọn lọc/i.test(loaded.footerText))loaded.footerText='© 2026 Bui Loc. All rights reserved.';setSite(loaded)} if(t[0])setTheme({...DEFAULT_THEME,...t[0]});
  if(p.length)setPages(p); if(po.length)setPosts(po); if(pr.length)setProjects(pr); if(a.length)setActivities(a); if(j.length)setJourney(j); if(n.length)setNavigation(n); if(f.length)setForms(f); if(r.length)setRedirects(r); if(b.length)setReusableBlocks(b);
 }finally{setLoading(false)}};
 useEffect(()=>{void refresh()},[]);
 useEffect(()=>{const root=document.documentElement;const vars:any={'--primary':theme.primary,'--accent':theme.accent,'--bg':theme.background,'--surface':theme.surface,'--text':theme.text,'--muted':theme.mutedText,'--border':theme.border,'--radius':`${theme.radius}px`,'--container':`${theme.containerWidth}px`};Object.entries(vars).forEach(([k,v])=>root.style.setProperty(k,String(v)));root.style.setProperty('--font-heading',theme.fontHeading);root.style.setProperty('--font-body',theme.fontBody)},[theme]);
 const setLocalCollection=(collection:string,items:any[])=>{const map:any={pages:setPages,posts:setPosts,projects:setProjects,activities:setActivities,journey:setJourney,navigation:setNavigation,forms:setForms,redirects:setRedirects,reusable_blocks:setReusableBlocks};map[collection]?.(items)};
 const saveSite=async(x:SiteConfig)=>{setSite(x);await putDocument('site_config','current',{...x,id:'current',isPublished:true})};
 const saveTheme=async(x:ThemeConfig)=>{setTheme(x);await putDocument('theme_config','current',{...x,id:'current',isPublished:true})};
 const saveDoc=async(collection:string,doc:any)=>{await putDocument(collection,doc.id,doc);const current:any={pages,posts,projects,activities,journey,navigation,forms,redirects,reusable_blocks:reusableBlocks}[collection]||[];const next=[...current.filter((x:any)=>x.id!==doc.id),doc];setLocalCollection(collection,next)};
 const removeDoc=async(collection:string,id:string)=>{await deleteDocument(collection,id);const current:any={pages,posts,projects,activities,journey,navigation,forms,redirects,reusable_blocks:reusableBlocks}[collection]||[];setLocalCollection(collection,current.filter((x:any)=>x.id!==id))};
 const value=useMemo(()=>({site,theme,pages,posts,projects,activities,journey,navigation,forms,redirects,reusableBlocks,loading,refresh,saveSite,saveTheme,saveDoc,removeDoc,setLocalCollection}),[site,theme,pages,posts,projects,activities,journey,navigation,forms,redirects,reusableBlocks,loading]);
 return <C.Provider value={value}>{children}</C.Provider>;
}
export function useCms(){const x=useContext(C);if(!x)throw new Error('CmsProvider missing');return x}
export const isPublic=pub;
