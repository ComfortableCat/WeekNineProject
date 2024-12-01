import { db } from "@/lib/db";
import MoreReplies from "./MoreReplies";
import Replies from "./Replies";

export default async function DeepReplies({ parentId, topicId }) {
  const replies = (
    await db.query(`SELECT * FROM comments WHERE parent_id = $1`, [parentId])
  ).rows;
  return (
    <>
      {replies.length !== 0 && (
        <MoreReplies>
          <Replies topicId={topicId} parentId={parentId} />
        </MoreReplies>
      )}
    </>
  );
}
