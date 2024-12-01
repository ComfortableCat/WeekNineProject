"use client";
import { useState } from "react";

export default function MoreReplies({ children }) {
  const [show, setShow] = useState(true);
  return (
    <>
      {show ? (
        <button onClick={() => setShow(!show)}>show replies</button>
      ) : (
        <>
          <button onClick={() => setShow(!show)}>hide replies</button>
          {children}
        </>
      )}
    </>
  );
}
