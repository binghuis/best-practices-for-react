"use client";
import React, { useMemo } from "react";

// useMemo 值缓存，只有当依赖项变化时才会重新计算。
const Page: React.FC = () => {
  const [count1, setCount1] = React.useState(0);
  const [count2, setCount2] = React.useState(0);

  const memoCount = useMemo(() => {
    console.log("memoCount");
    return count1 ** 2;
  }, [count1]);

  return (
    <div>
      <div>
        <button onClick={() => setCount1(count1 + 1)}>count1++ : </button>
        {count1}
      </div>
      <div>
        <button onClick={() => setCount2(count2 + 1)}>count2++ : </button>
        {count2}
      </div>
      count1 ** 2: {memoCount}
    </div>
  );
};

export default Page;
