import { Suspense, use } from "react";
import { getCat } from "../service";
import { ErrorBoundary } from "react-error-boundary";

export default function Page() {
  return (
    <div>
      <ErrorBoundary fallback={<p>component error</p>}>
        <Suspense fallback={<p>⌛...</p>}>
          <HookUseServer />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

// 服务器组件获取数据
// 服务器组件获取数据使用 async / await。

// 客户端获取数据
// 客户端组件获取数据使用 use。
// 如果涉及到服务器组件向客户端组件数据传输，在服务端创建 Promise 并作为 props 传递给客户端组件。
// 服务端创建 Promise 相比客户端组件创建更稳定。客户端组件每次渲染都会创建新的 Promise，而服务端组件只会在服务器渲染时创建一次。
// 服务器组件传递 Promise 给客户端组件相比使用 async / await 在服务端组件先获取数据再传值，能提前渲染客户端组件，减少客户端组件等待时间。
async function HookUseServer() {
  return <HookUseClient fetcher={getCat()} />;
}

function HookUseClient(props: { fetcher: Promise<{ data: string }> }) {
  "use client";
  const res = use(props.fetcher);
  return <div>{res.data}</div>;
}
