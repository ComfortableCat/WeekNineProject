import { db } from "@/lib/db";
import Link from "next/link";

export default async function UserTopicsList({ clerkId }) {
  const topics = (
    await db.query("SELECT * FROM topics WHERE clerkid = $1", [clerkId])
  ).rows;
  return (
    <div className="flex flex-col gap-5 my-5">
      {topics.map((topic) => {
        return (
          <Link key={topic.id} href={`/topics/${topic.id}`}>
            {topic.title}
          </Link>
        );
      })}
    </div>
  );
}
