import React from 'react';
import {ArrowUpRight} from 'lucide-react';
import {useCms} from '../context/CmsContext';

const valid=(u?:string)=>Boolean(u&&/^https?:\/\//i.test(u)&&u!=='https://');
export const Footer:React.FC<{navigate:(url:string)=>void}>=({navigate})=>{
 const{site,navigation}=useCms();
 const socials=(site.socialLinks||[]).filter(x=>valid(x.url)&&!/(skyfirst\.io\.vn|facebook\.com\/skyfirstnetwork)/i.test(x.url));
 const email=site.email&&!/@skyfirst\.io\.vn$/i.test(site.email)?site.email:'';
 return <footer className="site-footer"><div className="shell footer-grid footer-grid-refined"><div className="footer-identity"><img src="/logo-bui-loc.png" alt="Bui Loc" className="footer-logo"/><p>{site.tagline}</p><small>builoc.name.vn</small></div><div><h4>Điều hướng</h4>{navigation.filter(x=>x.visible&&!x.url.startsWith('/admin')).slice(0,8).map(x=><a key={x.id} href={x.url} onClick={e=>{if(x.url.startsWith('/')){e.preventDefault();navigate(x.url)}}}>{x.label}</a>)}</div><div><h4>Kênh chính thức</h4>{socials.length?socials.map(x=><a key={x.url} href={x.url} target="_blank" rel="noreferrer">{x.label}<ArrowUpRight size={13}/></a>):<span className="footer-placeholder">Các liên kết sẽ được cập nhật tại Bui Loc CMS.</span>}{email&&<a href={`mailto:${email}`}>{email}</a>}</div></div><div className="shell footer-bottom"><span>© 2026 Bui Loc. All rights reserved.</span><a href="/lien-he" onClick={e=>{e.preventDefault();navigate('/lien-he')}}>Liên hệ</a></div></footer>
}
