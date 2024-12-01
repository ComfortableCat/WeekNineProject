import UserTopicsList from "@/components/UserTopicsList";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
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
    revalidatePath("/users");
    redirect("/users");
  }
  return (
    <div>
      {/*<Image src={user.imageurl} width={100} height={100} alt="Profile Image" />*/}
      <div className=" flex flex-col border-4 border-violet-700 rounded-2xl w-3/5 py-5 px-10 mx-auto">
        <h2 className="text-xl">username:</h2>
        <h1 className="text-2xl">{user.username}</h1>
        <h2 className="text-xl">Bio:</h2>
        <h3 className="text-lg border-2 border-gray-900 rounded-md px-3 py-2">
          {user.bio}
        </h3>
      </div>

      <div className="my-10 flex flex-col border-4 border-violet-700 rounded-2xl w-3/5 py-5 px-10 mx-auto">
        <h2 className="text-xl">{user.username}&apos;s topics</h2>
        <div>
          <UserTopicsList clerkId={user.clerkid} />
        </div>
      </div>
    </div>
  );
}
