"use client";
import React, { useCallback, useEffect, useMemo } from "react";

const Page: React.FC = () => {
  const [count1, setCount1] = React.useState(0);
  const [count2, setCount2] = React.useState(0);

  const sum1 = useCallback(
    (n: number) => {
      return count1 + n;
    },
    [count1]
  );

  useEffect(() => {
    console.log("render1");
  }, [sum1]);

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
    </div>
  );
};

export default Page;
