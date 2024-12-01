import UserTopicsList from "@/components/UserTopicsList";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";

export default async function Page({ params }) {
  const userId = (await params).userId;
  const curUserId = await auth();
  const response = await db.query("SELECT * FROM users WHERE id = $1", [
    userId,
  ]);
  if (response.rowCount === 0) {
    notFound();
  }
  const user = response.rows[0];
  if (user.clerkId === curUserId.userId) {
    redirect("/users");
  }
  return (
    <div>
      {/*<Image src={user.imageurl} width={100} height={100} alt="Profile Image" />*/}
      <div>
        <h2>username:</h2>
        <h1>{user.username}</h1>
        <h2>Bio:</h2>
        <h3>{user.bio}</h3>
      </div>

      <div>
        <h2>{user.username}&apos;s topics</h2>
        <div>
          <UserTopicsList clerkId={user.clerkid} />
        </div>
      </div>
    </div>
  );
}
