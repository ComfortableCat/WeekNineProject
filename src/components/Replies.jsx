import ReplyButton from "./ReplyButton";
import { getReplies } from "@/lib/serveraction"; //DO THIS
import DeepReplies from "./DeepReplies";
import DeleteButton from "./DeleteButton";
import UserInfo from "./UserInfo";

export default async function Replies({ topicId, parentId }) {
  const replies = await getReplies(topicId, parentId);
  console.log(replies);
  return (
    <div>
      {replies.map((reply) => (
        <div key={reply.id} className={parentId !== 0 ? "ml-10" : ""}>
          <div>
            <p>{reply.content}</p>
            <UserInfo userId={reply.clerkid} />
          </div>

          <ReplyButton topicId={topicId} parentId={reply.id} />
          <DeleteButton to={`/topics/${topicId}`} type="reply" id={reply.id} />
          {reply.subreplies !== null &&
            reply.subreplies.map((subreply) => (
              <div key={subreply.id} className="ml-10">
                <div>
                  <p>{subreply.content}</p>
                  <UserInfo userId={reply.clerkid} />
                </div>
                <ReplyButton topicId={topicId} parentId={subreply.id} />
                <DeleteButton
                  to={`/topics/${topicId}`}
                  type="reply"
                  id={subreply.id}
                />
                <DeepReplies parentId={subreply.id} topicId={topicId} />
              </div>
            ))}
        </div>
      ))}
    </div>
  );
}
