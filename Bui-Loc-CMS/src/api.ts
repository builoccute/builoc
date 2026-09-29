export async function api<T=any>(url:string, init:RequestInit={}):Promise<T>{
  const response=await fetch(url,{...init,credentials:'include',cache:'no-store'});
  const data=await response.json().catch(()=>({}));
  if(!response.ok || data?.ok===false) throw new Error(data?.error||`HTTP ${response.status}`);
  return data as T;
}

export async function getCollection<T>(collection:string):Promise<T[]> {
  try{const d=await api<{items:T[]}>(`/api/cms?collection=${encodeURIComponent(collection)}`);return Array.isArray(d.items)?d.items:[]}catch{return[]}
}
export async function putDocument(collection:string,id:string,data:any){return api('/api/cms',{method:'PUT',headers:{'content-type':'application/json'},body:JSON.stringify({collection,id,data})})}
export async function deleteDocument(collection:string,id:string){return api(`/api/cms?collection=${encodeURIComponent(collection)}&id=${encodeURIComponent(id)}`,{method:'DELETE'})}
