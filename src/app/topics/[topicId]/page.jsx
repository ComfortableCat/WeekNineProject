import { db } from "@/lib/db";
import ReplyButton from "@/components/ReplyButton";
import CommentForm from "@/components/CommentForm";
import Replies from "@/components/Replies";
import DeleteButton from "@/components/DeleteButton";

export default async function page({ params }) {
  const topicId = (await params).topicId;
  const result = (
    await db.query(
      "SELECT topics.*, users.username FROM topics LEFT JOIN users ON topics.clerkid = users.clerkid WHERE topics.id = $1",
      [topicId]
    )
  ).rows;

  const topic = await result[0];
  return (
    <div className="flex justify-center flex-col w-2/3 m-auto border-4 border-purple-950 rounded-xl p-5">
      <div>
        <h2>{topic.title}</h2>
        <p>{topic.username}</p>
        <h3>{topic.content}</h3>
        <div className="flex flex-col">
          <ReplyButton className="w-16 h-5">
            <CommentForm topicId={await topicId} parentId={0} />
          </ReplyButton>
          <DeleteButton
            to={`/topics`}
            type="topic"
            id={await topicId}
            className="w-16 h-5"
          />
        </div>
      </div>
      <p> this is the page of a talking point with id {await topicId}</p>
      <div>
        <h3>Replies</h3>
        <Replies topicId={await topicId} parentId={0} />
      </div>
    </div>
  );
}
