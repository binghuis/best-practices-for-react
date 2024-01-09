"use client";
import { memo, useDeferredValue, useEffect, useState } from "react";

// 组件初始化的时候 useDeferredValue 和 useState 的值相等。
// state 变化时，先使用 useDeferredValue 保存的 state 旧值和 state 新值重渲染一次。
// 然后在后台使用 state 新值重渲染组件，重渲染完成后，替换 UI，且 useDeferredValue 更新为 state 新值。
// 在后台重渲染期间，state 变化，后台重渲染会中断并使用新 state 再次重渲染。
// useDeferredValue 可以避免组件渲染阻塞。因为根据 state 新值进行的组件重渲染在后台执行，在后台重渲染完成之前，useDeferredValue 值不变。

export default function Page() {
  const [count, setCount] = useState(0);
  const prevCount = useDeferredValue(count);
  console.log("Parent", prevCount, count);

  return (
    <div>
      <ChildA count={count} />
      <ChildB count={prevCount} />
      <div
        onClick={() => {
          setCount((v) => v + 1);
        }}
      >
        +
      </div>
    </div>
  );
}

const ChildA = (props: { count: number }) => {
  const [count, setCount] = useState(props.count);
  const prevCount = useDeferredValue(count);
  console.log("A", prevCount, count);

  useEffect(() => {
    console.log("prev A", prevCount);
  }, [prevCount]);

  return (
    <div
      onClick={() => {
        setCount((v) => {
          return v + 1;
        });
      }}
    >
      A: {count}
    </div>
  );
};

// useDeferredValue 配合 memo 组件记忆化，把记忆化的组件渲染变为非阻塞渲染，useDeferredValue 变化意味着在后台已经完成了记忆化组件的重渲染，此时前台 UI 感知不到记忆化组件在后台的计算。
const ChildB = memo((props: { count: number }) => {
  console.log("B", props.count);

  return <div>B: {props.count}</div>;
});

ChildB.displayName = "ChildB";

// 延迟一个值与防抖和节流之间有什么不同？
// 防抖和节流是为了延迟函数的执行，而 useDeferredValue 是为了延迟值的更新。
// 防抖和节流并不能解决渲染阻塞的问题，而 useDeferredValue 可以。
