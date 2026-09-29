import React from 'react';
type State={error:Error|null};
export class ErrorBoundary extends React.Component<{children:React.ReactNode},State>{
 state:State={error:null}; static getDerivedStateFromError(error:Error){return{error}}
 componentDidCatch(error:Error,info:React.ErrorInfo){console.error('Bui Loc runtime error',error,info)}
 render(){if(!this.state.error)return this.props.children;return <main className="safe-error"><section><img src="/logo-bui-loc.svg" alt="Bui Loc"/><span>ĐÃ GẶP SỰ CỐ</span><h1>Trang này chưa thể hiển thị.</h1><p>Một phần giao diện vừa gặp lỗi. Bạn có thể tải lại trang để thử lại mà không làm mất nội dung đã lưu.</p><div><button onClick={()=>location.reload()}>Tải lại trang</button><a href="/">Về trang chủ</a></div></section></main>}
}
