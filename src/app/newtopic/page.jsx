import * as Form from "@radix-ui/react-form";
import Main from "@/components/Main";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default function CreateTopicPage() {
  async function handleSubmit(formData) {
    "use server";
    const user = await auth();
    const title = formData.get("title");
    const content = formData.get("details");
    const response = (
      await db.query(
        "INSERT INTO topics (title, content, clerkid) VALUES ($1,$2,$3) RETURNING id",
        [title, content, user.userId]
      )
    ).rows;
    const id = await response[0].id;
    console.log(await id);
    revalidatePath(`/topics/${id}`);
    redirect(`/topics/${id}`);
  }
  return (
    <Main>
      <Form.Root
        className="w-[260px]"
        name="New topic form"
        action={handleSubmit}
      >
        <Form.Field className="mb-2.5 grid" name="title">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
              Title
            </Form.Label>
            <Form.Message
              className="text-[13px] text-black opacity-80"
              match="valueMissing"
            >
              Please enter a topic title
            </Form.Message>
          </div>
          <Form.Control asChild>
            <input
              className="box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded bg-blackA2 px-2.5 text-[15px] leading-none text-black shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-black hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
              type="text"
              required
            />
          </Form.Control>
        </Form.Field>
        <Form.Field className="mb-2.5 grid" name="details">
          <div className="flex items-baseline justify-between">
            <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
              Further details
            </Form.Label>
            <Form.Message
              className="text-[13px] text-rose-900 opacity-80"
              match="valueMissing"
            >
              Enter further details here
            </Form.Message>
          </div>
          <Form.Control asChild>
            <textarea className="box-border inline-flex w-full resize-none appearance-none items-center justify-center rounded bg-blackA2 p-2.5 text-[15px] leading-none text-black shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-black hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]" />
          </Form.Control>
        </Form.Field>
        <Form.Submit asChild>
          <button className="mt-2.5 box-border inline-flex h-[35px] w-full items-center justify-center rounded bg-white px-[15px] font-medium leading-none text-violet11 shadow-[0_2px_10px] shadow-blackA4 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
            Post Topic
          </button>
        </Form.Submit>
      </Form.Root>
    </Main>
  );
}
