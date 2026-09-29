import React from 'react';
import {useCms,isPublic} from '../context/CmsContext';
import {BlockRenderer} from '../components/BlockRenderer';
export const CustomPage:React.FC<{slug:string;navigate:(u:string)=>void}>=({slug,navigate})=>{const{pages}=useCms();const p=pages.find(x=>x.slug===slug&&isPublic(x));if(!p)return <div className="shell not-found"><div className="eyebrow">404</div><h1>Trang không tồn tại</h1><p>Đường dẫn này chưa có nội dung công khai.</p><button className="button primary" onClick={()=>navigate('/')}>Về trang chủ</button></div>;return <main><BlockRenderer blocks={p.blocks||[]} navigate={navigate}/></main>}
