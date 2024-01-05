"use client";
import { Suspense, use } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { getCat } from "../service";

export default function Page() {
  return (
    <div>
      <ErrorBoundary fallback={<p>error</p>}>
        <Suspense fallback={<p>⌛...</p>}>
          <UseWithPromise />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}

function UseWithPromise() {
  // 如果你要在客户端组件获取数据，那么推荐使用 use。

  // 当 use 读取 Promise 的值时，需要与 Suspense 和 错误边界 配合使用。
  // 当 Promise pending 时，显示 Suspense fallback UI，当 Promise reject 时，错误边界捕获错误并显示 fallback UI。
  const res = use(getCat());
  return <div className="">{res.data}</div>;
}
