import React from 'react';

type State={error:Error|null};
export class ErrorBoundary extends React.Component<{children:React.ReactNode},State>{
  state:State={error:null};
  static getDerivedStateFromError(error:Error){return{error}}
  componentDidCatch(error:Error,info:React.ErrorInfo){console.error('Bui Loc CMS runtime error',error,info)}
  render(){
    if(!this.state.error)return this.props.children;
    return <main style={{minHeight:'100vh',display:'grid',placeItems:'center',padding:24,fontFamily:'system-ui',background:'#f7f9fc',color:'#0b1220'}}><section style={{maxWidth:680,background:'#fff',padding:32,borderRadius:20,border:'1px solid #e2e8f0'}}><h1 style={{marginTop:0}}>Website đang tải chưa đúng</h1><p>Ứng dụng đã được tải nhưng gặp lỗi khi khởi chạy. Hãy tải lại trang. Nếu lỗi còn tiếp diễn, mở Console để xem chi tiết.</p><button onClick={()=>location.reload()} style={{border:0,borderRadius:10,padding:'11px 16px',background:'#1268f3',color:'#fff',fontWeight:700}}>Tải lại trang</button><details style={{marginTop:18}}><summary>Chi tiết kỹ thuật</summary><pre style={{whiteSpace:'pre-wrap',fontSize:12}}>{this.state.error.message}</pre></details></section></main>
  }
}
