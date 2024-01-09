"use client";
import React, { useEffect } from "react";

// useEffect 是专门处理副作用的 Hook，它接收一个函数作为参数，这个函数就是我们的副作用函数。
// useEffect 会在组件渲染到屏幕之后执行我们的副作用函数。
// 不要滥用 useEffect，只有与组件渲染相关的副作用操作才写在 useEffect 里。
// 如果一个操作是由交互引起的，那么乖乖的把它写在事件处理函数里。
// useEffect 在更新时会执行上一轮 useEffect 副作用清除函数，组件卸载时也会执行副作用清除函数。
// 组件挂载 => 执行副作用函数 => 组件更新 => 执行上一轮副作用清除函数 => 执行副作用函数 => 组件卸载 => 执行副作用清除函数。
// 副作用清除函数是 useEffect 的闭包，所以它可以访问到 useEffect 的词法环境，且每轮 useEffect 词法环境独立。
// 每个 useEffect 处理一个逻辑，如果有多个逻辑，就写多个 useEffect，这并不麻烦，而且这会让你的代码更容易维护。

const Page: React.FC = () => {
  useEffect(() => {}, []);

  return <div></div>;
};

export default Page;
