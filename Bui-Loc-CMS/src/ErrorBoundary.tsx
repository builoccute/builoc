import React from 'react';
type State={error:Error|null};
export class ErrorBoundary extends React.Component<{children:React.ReactNode},State>{
 state:State={error:null}; static getDerivedStateFromError(error:Error){return{error}}
 componentDidCatch(error:Error,info:React.ErrorInfo){const detail=`${error?.name||'Error'}: ${error?.message||'Unknown error'}\n${error?.stack||''}\n${info.componentStack||''}`;try{sessionStorage.setItem('bl-last-runtime-error',detail)}catch{}console.error('Bui Loc runtime error',error,info)}
 render(){if(!this.state.error)return this.props.children;const admin=location.pathname.startsWith('/admin');return <main className="safe-error"><section><img src="/logo-bui-loc.png" alt="Bui Loc"/><span>ĐÃ GẶP SỰ CỐ</span><h1>Trang này chưa thể hiển thị.</h1><p>{admin?'Khu vực quản trị vừa gặp lỗi khi khởi chạy. Hãy mở chi tiết bên dưới để xác định đúng thành phần gặp sự cố.':'Một phần giao diện vừa gặp lỗi. Bạn có thể tải lại trang để thử lại.'}</p>{admin&&<details className="runtime-detail"><summary>Chi tiết chẩn đoán</summary><code>{this.state.error.name}: {this.state.error.message}</code></details>}<div><button onClick={()=>location.reload()}>Tải lại trang</button><a href="/">Về trang chủ</a></div></section></main>}
}
