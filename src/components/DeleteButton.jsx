import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export default function DeleteButton({ to, type, id }) {
  async function handleClick() {
    "use server";
    if (type === "talkingpoint") {
      await db.query("DELETE FROM topics WHERE id = $1", [id]);
    } else {
      await db.query("DELETE FROM comments WHERE id = $1", [id]);
    }
    revalidatePath(to);
  }
  return <button onClick={handleClick}>Delete {type}</button>;
}
