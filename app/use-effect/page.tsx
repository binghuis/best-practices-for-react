"use client";
import React, { useEffect, useLayoutEffect, useState } from "react";

// useEffect 是专门处理副作用的 Hook，它接收一个函数作为参数，这个函数就是我们的副作用函数。
// useEffect 会在组件渲染到屏幕之后执行我们的副作用函数。
// 不要滥用 useEffect，只有与组件渲染相关的副作用操作才写在 useEffect 里。
// 如果一个操作是由交互引起的，那么乖乖的把它写在事件处理函数里。
// useEffect 在更新时会执行上一轮 useEffect 副作用清除函数，组件卸载时也会执行副作用清除函数。
// 组件挂载 => 执行副作用函数 => 组件更新 => 执行上一轮副作用清除函数 => 执行副作用函数 => 组件卸载 => 执行副作用清除函数。
// 副作用清除函数是 useEffect 的闭包，所以它可以访问到 useEffect 的词法环境，且每轮 useEffect 词法环境独立。
// 每个 useEffect 处理一个逻辑，如果有多个逻辑，就写多个 useEffect，这并不麻烦，而且这会让你的代码更容易维护。
// 能写成自定义 Hook 的副作用逻辑，就尽量写成自定义 Hook，这样可以让你的代码更加清晰。

// 我们最终写函数组件的思路应该是：
// 1. 写一个函数组件，保证渲染函数是纯函数。不要在渲染函数里处理任何副作用。
// 2. 使用 useState 管理组件状态，state 变化则重新执行渲染函数，UI 由 state 驱动。
// 3. 使用 useEffect 处理副作用，当渲染操作执行完，处理副作用，在副作用里操作 state。
// 4. 把 useEffect 拆解成独立的自定义 Hook，一个自定义 Hook 只处理一个逻辑。
// 5. 使用 memo 配合 useMemo、useCallback、useDeferredValue 使传入子组件的 props 被记忆化，避免子组件随父组件多次渲染。

const Page: React.FC = () => {
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   console.log("useEffect: ", count);
  //   if (count === 0) {
  //     setCount(1);
  //   }
  //   let now = performance.now();
  //   while (performance.now() - now < 1000) {}
  // }, [count]);

  useLayoutEffect(() => {
    console.log("useLayoutEffect: ", count);
    if (count === 0) {
      setCount(1);
    }
    let now = performance.now();
    while (performance.now() - now < 1000) {}
  }, [count]);

  console.log("render: ", count);

  return (
    <div>
      <p>count: {count}</p>
      <button onClick={() => setCount((v) => v + 1)}>+</button>
    </div>
  );
};

export default Page;
