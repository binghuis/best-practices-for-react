import { use } from "react";
import HookUse from "../components/hook-use";
import { getCat } from "../service";

export default function Page() {
  return (
    <div>
      {/* <HookUse /> */}
      <HookUseServer />
    </div>
  );
}

// 如果你要在服务器组件获取数据，推荐使用 async / await。
// async / await 会从调用 await 的点开始渲染，而 use 会在数据获取到后重新渲染组件。

// 如果你要从服务器组件向客户端组件传递数据，在服务器组件创建 Promise 并将其传递给 客户端组件 优于在客户端组件中创建 Promise。
// 在客户端组件中创建的 Promise 每次渲染都会重新创建。从服务器组件传递到客户端组件的 Promise 在重新渲染时保持稳定。

// 如果你要在客户端组件获取数据，那么推荐使用 use。

async function HookUseServer() {
  "use server";
  // const res = await getCat();
  // const cat = res.data;

  return <HookUseClient fetcher={getCat()} />;
}

function HookUseClient(props: {
  data?: string;
  fetcher?: Promise<{ data: string }>;
}) {
  "use client";
  if (props?.data) {
    return <div>{props.data}</div>;
  }
  if (props?.fetcher) {
    const res = use(props.fetcher);
    return <div>{res.data}</div>;
  }
  return null;
}
