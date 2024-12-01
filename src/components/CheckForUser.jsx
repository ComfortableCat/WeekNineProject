import { db } from "@/lib/db";
import { auth, currentUser } from "@clerk/nextjs/server";

export default async function CheckForUser() {
  const curUser = await currentUser();
  const user = await auth();
  if (user.userId !== null) {
    const response = db.query("SELECT * FROM users WHERE clerkid = $1", [
      user.userId,
    ]);
    if ((await response).rowCount === 0) {
      await db.query(
        "INSERT INTO users (clerkid, username, imageurl) VALUES ($1,$2,$3)",
        [user.userId, curUser.username, curUser.imageUrl]
      );
    }
  }
  return;
}
