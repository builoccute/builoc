import React,{useEffect,useState} from 'react';

export function AmbientUI(){
 const [progress,setProgress]=useState(0);
 useEffect(()=>{
  const onScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;setProgress(max>0?Math.min(1,scrollY/max):0)};
  const onPointer=(e:PointerEvent)=>{document.documentElement.style.setProperty('--pointer-x',`${e.clientX}px`);document.documentElement.style.setProperty('--pointer-y',`${e.clientY}px`)};
  onScroll();addEventListener('scroll',onScroll,{passive:true});addEventListener('pointermove',onPointer,{passive:true});
  return()=>{removeEventListener('scroll',onScroll);removeEventListener('pointermove',onPointer)}
 },[]);
 return <><div className="scroll-progress" style={{transform:`scaleX(${progress})`}}/><div className="pointer-aura" aria-hidden="true"/><div className="ambient-grid" aria-hidden="true"/></>
}
