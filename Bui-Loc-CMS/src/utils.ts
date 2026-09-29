export const slugify=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').replace(/đ/g,'d').replace(/Đ/g,'D').toLowerCase().trim().replace(/[^a-z0-9]+/g,'-').replace(/^-+|-+$/g,'');
export const id=()=>crypto.randomUUID?.()||`${Date.now()}-${Math.random()}`;
export const uid=(prefix='id')=>`${prefix}_${crypto.randomUUID?.()||`${Date.now()}-${Math.random().toString(36).slice(2)}`}`;
export const fmtDate=(v?:string)=>{if(!v)return'';const d=new Date(v);return Number.isNaN(d.getTime())?v:d.toLocaleDateString('vi-VN',{day:'2-digit',month:'2-digit',year:'numeric'})};
export const internal=(url:string)=>url.startsWith('/');
export const stripHtml=(s='')=>s.replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim();
