"use client";
import { memo, useState } from "react";
import { flushSync } from "react-dom";

export default function Page() {
  return (
    <div>
      <Parent />
    </div>
  );
}
// useState 是函数式组件的状态管理工具，它的作用是在函数式组件中声明一个状态变量，当状态变量发生变化时，组件会重新渲染。
// useState 只会在组件初始化渲染的时候执行一次，在组件重渲染时不会重新声明，它会保留之前的状态。
// state 具有异步批处理特性，也就是在同一个事件处理函数里面，setState 会被加入队列，在事件处理程序执行完毕之后，才会批量更新 state。
const Parent = () => {
  const [count, setCount] = useState(0);
  return (
    <div>
      <ChildA count={count} />
      <ChildB count={count} key={count} />
      <ChildC count={count} />
      <ChildSync count={count} />
      <div
        onClick={() => {
          setCount((v) => v + 1);
        }}
      >
        +
      </div>
    </div>
  );
};

// 组件 ChildA 只会在初始化的时候，初始化 count 状态，之后不会再次初始化。
const ChildA = (props: { count: number }) => {
  const [count, setCount] = useState(props.count);
  console.log("A", count);

  return (
    <div
      onClick={() => {
        setCount((v) => v + 1);
      }}
    >
      A: {count}
    </div>
  );
};

// 组件 ChildB 在父组件重渲染的时候，会重新初始化 count 状态，因为 key 发生了变化。
// 在 react UI 树（由渲染过的组件构成的，被称为渲染树）中，相同位置的相同组件被视为同一个组件。
// 在 react 中，key 是用来标识组件的，当 key 发生变化的时候，react 认为组件已经发生了变化，会重新渲染组件。
// key 是组件级别的，在同一个父组件下有效，不同父组件下的 key 不会相互影响。
const ChildB = (props: { count: number }) => {
  const [count, setCount] = useState(props.count);
  console.log("B", count);

  return (
    <div
      onClick={() => {
        setCount((v) => v + 1);
      }}
    >
      B: {count}
    </div>
  );
};

// 通过记忆化组件，依赖变化组件重渲染。
const ChildC = memo((props: { count: number }) => {
  const [count, setCount] = useState(props.count);
  console.log("C", count);

  return (
    <div
      onClick={() => {
        setCount((v) => v + 1);
      }}
    >
      C: {count}
    </div>
  );
});

ChildC.displayName = "ChildC";

// flushSync 是 react/dom 的一个 api，它的作用是同步执行一个函数，这个函数中的 state 更新会同步更新。
// 对比 state 异步批处理特性，flushSync 会立刻重渲染 dom。
// 慎用 flushSync，它会阻塞 UI 渲染，导致页面卡顿。不到万不得已，不要使用 flushSync。
const ChildSync = (props: { count: number }) => {
  const [count, setCount] = useState(props.count);
  console.log("SyncOuter", count);

  return (
    <div
      onClick={() => {
        flushSync(() => {
          setCount((v) => v + 1);
          console.log("SyncInner", count);
        });
      }}
    >
      Sync: {count}
    </div>
  );
};

// 根据 react 数据不可变性规范，在 setState 数组或者对象的时候，需要返回新对象，否则不会触发更新。
// 在对原有 state 数组或对象进行修改的时候，避免在原有对象上进行修改，而是返回一个新的对象。
// 注意浅拷贝可能违反数据不可变性，深拷贝会导致性能问题。
// 使用 use-immer 库优化数组和对象的 setState。https://github.com/immerjs/use-immer
