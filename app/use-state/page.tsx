"use client";
import { useState } from "react";

export default function Page() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(() => {});
  return <div>2</div>;
}
