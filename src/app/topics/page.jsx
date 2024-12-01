import Main from "@/components/Main";
import UserInfo from "@/components/UserInfo";
import { db } from "@/lib/db";
import Link from "next/link";

export default async function TopicsPage() {
  const topics = (await db.query("SELECT * FROM topics")).rows;
  return (
    <Main>
      <div className="h-5/6 flex flex-col border-4 border-violet-700 rounded-2xl w-3/5 py-5 px-10 mx-auto ">
        <p className="mb-5 text-xl">Explore topics below</p>
        {topics.map((topic) => {
          return (
            <div key={topic.id} className="flex justify-between">
              <Link href={`/topics/${topic.id}`}>{topic.title}</Link>
              <UserInfo userId={topic.clerkid} />
            </div>
          );
        })}
      </div>
    </Main>
  );
}
