import { db } from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { Suspense } from "react";
import LoadingUserInfo from "./LoadingUserInfo";

export default async function UserInfo({ userId }) {
  const response = await db.query("SELECT * FROM users WHERE clerkid = $1", [
    userId,
  ]);
  const user = await response.rows[0];
  return (
    <Suspense fallback={<LoadingUserInfo />}>
      <Link href={`/users/${userId}`}>
        {/*<Image src={user.imageurl} alt="profile image" width={50} height={50} />*/}
        <p>{user.username}</p>
      </Link>
    </Suspense>
  );
}
