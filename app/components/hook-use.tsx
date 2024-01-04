"use client";

import { DogContext } from "@/app/context";
import { use } from "react";
import { getCat } from "../service";

// https://zh-hans.react.dev/reference/react/use
// use 可同步读取 Promise 和 context 的值。
// use 只能在组件或 Hook 内部使用，use 具有其他钩子没有的特殊能力——可以将调用嵌套在条件、块和循环中。

export default function HookUseClient() {
  // 当 use 读取 context 的值时，可替代 useContext
  const dog = use(DogContext);

  // 当 use 读取 Promise 的值时，需要与 Suspense 和 错误边界 配合使用。
  // 当 Promise pending 时，显示 Suspense fallback UI，当 Promise reject 时，错误边界捕获错误并显示 fallback UI。
  const res = use(getCat());
  const cat = res.data;

  return (
    <div>
      {cat} 和 {dog}
    </div>
  );
}
