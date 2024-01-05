"use client";

import { use } from "react";
import { DogContext } from "../context";

export default function Page() {
  // 当 use 读取 context 的值时，可替代 useContext。
  // 相比 useContext，use 可以在循环和条件语句中使用。

  const dog = use(DogContext);

  return <div>{dog}</div>;
}
