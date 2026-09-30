import React,{useEffect,useState} from 'react';

export function AmbientUI(){
 const [progress,setProgress]=useState(0);
 useEffect(()=>{
  let raf=0;
  const onScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;setProgress(max>0?Math.min(1,scrollY/max):0)};
  const onPointer=(e:PointerEvent)=>{cancelAnimationFrame(raf);raf=requestAnimationFrame(()=>{const root=document.documentElement;root.style.setProperty('--pointer-x',`${e.clientX}px`);root.style.setProperty('--pointer-y',`${e.clientY}px`);root.style.setProperty('--mx',`${(e.clientX/innerWidth-.5).toFixed(3)}`);root.style.setProperty('--my',`${(e.clientY/innerHeight-.5).toFixed(3)}`)})};
  const onMove=(e:MouseEvent)=>{const target=(e.target as HTMLElement)?.closest?.('.magnetic') as HTMLElement|null;if(!target)return;const r=target.getBoundingClientRect();target.style.setProperty('--mag-x',`${(e.clientX-r.left-r.width/2)*.12}px`);target.style.setProperty('--mag-y',`${(e.clientY-r.top-r.height/2)*.12}px`)};
  const onOut=(e:MouseEvent)=>{const target=(e.target as HTMLElement)?.closest?.('.magnetic') as HTMLElement|null;if(target){target.style.setProperty('--mag-x','0px');target.style.setProperty('--mag-y','0px')}};
  onScroll();addEventListener('scroll',onScroll,{passive:true});addEventListener('pointermove',onPointer,{passive:true});document.addEventListener('mousemove',onMove,{passive:true});document.addEventListener('mouseout',onOut,{passive:true});
  return()=>{cancelAnimationFrame(raf);removeEventListener('scroll',onScroll);removeEventListener('pointermove',onPointer);document.removeEventListener('mousemove',onMove);document.removeEventListener('mouseout',onOut)}
 },[]);
 return <><div className="scroll-progress" style={{transform:`scaleX(${progress})`}}/><div className="pointer-aura" aria-hidden="true"/><div className="ambient-grid" aria-hidden="true"/><div className="ambient-noise" aria-hidden="true"/><div className="ambient-beam" aria-hidden="true"/></>
}
