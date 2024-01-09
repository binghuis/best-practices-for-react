"use client";

import { useDog } from "../context";

// 如果你的 react 版本支持 use，推荐使用 use 替代 useContext。
export default function Page() {
  const dog = useDog();

  return <div>{dog}</div>;
}
