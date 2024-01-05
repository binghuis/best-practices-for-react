"use client";
import React, { memo, useCallback, useEffect, useMemo, useState } from "react";

// https://zh-hans.react.dev/reference/react/memo#
// memo 缓存组件，当组件的 props 不变时，组件不随父组件渲染重渲染。
// 当组件重渲染的时候对象、数组和函数会重新创建，导致 memo 失效，组件会随父组件重渲染而重渲染。
// 尽量不要将对象、数组和函数作为 props 传递给 memo 组件。

// useMemo 和 useCallback 分别记忆化值和记忆化函数，
// 当组件重新渲染的时候只要 useMemo 和 useCallback 的依赖项不变，记忆化的值和函数就不会被再次计算。
// 配合 memo 使用，可以实现类似 PureComponent 的效果，将 memo 组件的 props 记忆化，当父组件更新的时候被记忆化的子组件只要 props 不变，就不会重新渲染。
const Page: React.FC = () => {
  const [count, setCount] = useState(0);

  return (
    <div>
      <MemoChildA count={count} />
      <ChildB />
      <div
        onClick={() => {
          setCount((v) => v + 1);
        }}
      >
        +1
      </div>
    </div>
  );
};

export default Page;

// useState 只在组件首次渲染的时候执行，组件重渲染时不会再次执行，所以 state 也可配合 memo 使用。

const MemoChildA = memo(function ChildA(props: { count: number }) {
  const [count, setCount] = useState(0);

  const memoCount = useMemo(() => {
    return count ** 2;
  }, [count]);

  const memoFn = useCallback(() => {
    return count ** 2;
  }, [count]);

  useEffect(() => {
    console.log("render memo");
  }, [memoCount]);

  useEffect(() => {
    console.log("render cb");
  }, [memoFn]);

  console.log("Memo A");

  return (
    <div
      onClick={() => {
        setCount((v) => ++v);
      }}
    >
      A
    </div>
  );
});

const ChildB = function ChildB() {
  console.log("B");

  return <div>B </div>;
};
