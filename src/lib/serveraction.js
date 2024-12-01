"use server";

import { db } from "./db";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export async function handleSubmit(formData) {
  "use server";
  const user = await auth();
  const topicId = formData.get("topicId");
  const parentId = formData.get("parentId");
  const reply = formData.get("reply");
  console.log("topicId ", topicId);
  console.log("reply ", reply);
  console.log("parentId ", parentId);
  await db.query(
    "INSERT INTO comments (topicid, parentid, clerkid, content) VALUES ($1, $2, $3, $4)",
    [topicId, parentId, user.userId, reply]
  );
  revalidatePath(`/topics/${topicId}`);
}

export async function getReplies(topicId, parentId) {
  let replies = [];
  if (parentId === 0) {
    const result = (
      await db.query(
        `SELECT
              comments.*,
              users.username,
              replies.titlesubreplies as subreplies,
              replies.subusers
              from
              comments
              left JOIN users ON comments.clerkid = users.clerkid 
              LEFT JOIN (
                select
                 parentid,
                 COALESCE(json_agg(secondaryreplies), '[]'::JSON) AS titlesubreplies,
                 ARRAY_AGG(users.username) as subusers
                 from
                 comments AS secondaryreplies
                 left join users on secondaryreplies.clerkid = users.clerkid
                 GROUP by
                 parentid
              ) AS replies
              on
              comments.id = replies.parentid
              where
              comments.parentid IS NULL AND comments.topicid = $1
              ORDER BY comments.id`,
        [topicId]
      )
    ).rows;
    replies = result;
  } else {
    const result = (
      await db.query(
        `SELECT
                    comments.*,
                    users.username,
                    replies.titlesubreplies as subreplies
                    from
                    comments
                    left JOIN users ON comments.clerkid = users.clerkid 
                LEFT JOIN (
                  select
                   parentid,
                   COALESCE(json_agg(row_to_json(secondaryreplies,false)), '[]'::JSON) AS titlesubreplies
                   from
                   comments AS secondaryreplies
                   GROUP by
                   parentid
                ) AS replies
                on
                comments.id = replies.parentid
                where
                comments.parentid =$1 AND comments.topicid = $2
                ORDER BY comments.id`,
        [parentId, topicId]
      )
    ).rows;
    replies = result;
  }
  return replies;
}
