"use client";
import { useEffect, useState } from "react";

const Page: React.FC = () => {
  const [state, setState] = useState(0);

  useEffect(() => {
    console.log("Page useEffect");
  }, []);

  return (
    <div>
      <div>
        <Child />
      </div>
      <button
        onClick={() => {
          setState((v) => v + 1);
        }}
      >
        Page: {state}
      </button>
    </div>
  );
};

const Child: React.FC = () => {
  const { state, increment } = useCustomHook(0);

  useEffect(() => {
    console.log("Child useEffect");
  }, []);

  return <button onClick={increment}>Child: {state}</button>;
};

const useCustomHook = (count: number) => {
  const [state, setState] = useState(count);
  console.log("useCustomHook");

  useEffect(() => {
    setTimeout(() => {
      console.log("Custom useEffect");
      setState((v) => v + 1);
    }, 1000);
  }, []);

  const increment = () => {
    setState(state + 1);
  };

  return { state, increment };
};

export default Page;
