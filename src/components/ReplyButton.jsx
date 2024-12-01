"use client";
import { useState } from "react";
import CommentForm from "./CommentForm";

export default function ReplyButton({ topicId, parentId }) {
  const [show, setShow] = useState(true);
  return (
    <>
      {show ? (
        <button onClick={() => setShow(!show)}>Reply</button>
      ) : (
        <>
          <button onClick={() => setShow(!show)}>Hide</button>
          <CommentForm topicId={topicId} parentId={parentId} />
        </>
      )}
    </>
  );
}
