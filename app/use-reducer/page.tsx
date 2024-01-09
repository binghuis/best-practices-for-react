"use client";
import { useReducer } from "react";

// useReducer 可以把多个状态逻辑整合到一个 reducer 中，这个 reducer 接收当前的 state 和 action，返回新的 state。
// useReducer 返回的 state 和 useState 返回的 state 对渲染的作用是一样的。
// 它可以配合 memo 使用，也可以配合 useContext / use 使用。
export default function Page() {
  const [state, dispatch] = useReducer(reducer, { age: 42 });

  return (
    <>
      <button
        onClick={() => {
          dispatch({ type: "incremented_age" });
        }}
      >
        Increment age
      </button>
      <p>Hello! You are {state.age}.</p>
    </>
  );
}

function reducer(state: { age: number }, action: { type: string }) {
  if (action.type === "incremented_age") {
    return {
      age: state.age + 1,
    };
  }
  throw Error("Unknown action.");
}
