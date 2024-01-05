"use client";

import { useDog } from "../context";

export default function Page() {
  // 如果你的 react 版本支持 use，推荐使用 use 替代 useContext。
  const dog = useDog();

  return <div>{dog}</div>;
}
