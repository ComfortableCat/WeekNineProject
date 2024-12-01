import * as Form from "@radix-ui/react-form";
import * as Dialog from "@radix-ui/react-dialog";
import * as VisuallyHidden from "@radix-ui/react-visually-hidden";
import { Cross2Icon } from "@radix-ui/react-icons";
import { auth } from "@clerk/nextjs/server";
import UserTopicsList from "@/components/UserTopicsList";
import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";
import Main from "@/components/Main";

export default async function ProfilePage() {
  const { userId } = await auth();
  const response = await db.query("SELECT * FROM users WHERE clerkid = $1", [
    userId,
  ]);
  const user = await response.rows[0];
  async function handleSubmit(formData) {
    "use server";
    const username = formData.get("username");
    const bio = formData.get("bio");

    await db.query(
      "UPDATE users SET username = $1, bio = $2 WHERE clerkid = $3",
      [username, bio, userId]
    );
    revalidatePath("/users");
  }
  return (
    <Main>
      <div className=" flex flex-col border-4 border-violet-700 rounded-2xl w-3/5 py-5 px-10 mx-auto">
        <h2 className="text-xl">Username:</h2>
        <h1 className="text-2xl">{user.username}</h1>
        <h2 className="text-xl">Bio:</h2>
        <h3 className="text-lg border-2 border-gray-900 rounded-md px-3 py-2">
          {user.bio}
        </h3>

        <Dialog.Root>
          <Dialog.Trigger asChild>
            <button className="inline-flex h-[35px] items-center justify-center rounded bg-white px-[15px] font-medium leading-none text-violet11 shadow-[0_2px_10px] shadow-blackA4 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
              Edit profile
            </button>
          </Dialog.Trigger>
          <Dialog.Portal>
            <Dialog.Overlay className="fixed inset-0 bg-black bg-opacity-40 data-[state=open]:animate-overlayShow" />
            <Dialog.Content className="fixed left-1/2 top-1/2 max-h-[85vh] w-[90vw] max-w-[450px] -translate-x-1/2 -translate-y-1/2 rounded-md bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none data-[state=open]:animate-contentShow">
              <VisuallyHidden.Root asChild>
                <Dialog.Title />
              </VisuallyHidden.Root>
              <Form.Root
                className="w-[260px]"
                name="Edit Profile"
                action={handleSubmit}
              >
                <Form.Field className="mb-2.5 grid" name="username">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                      Username
                    </Form.Label>
                    <Form.Message
                      className="text-[13px] text-black opacity-80"
                      match="valueMissing"
                    >
                      You must have a username
                    </Form.Message>
                  </div>
                  <Form.Control asChild>
                    <input
                      className="box-border inline-flex h-[35px] w-full appearance-none items-center justify-center rounded bg-blackA2 px-2.5 text-[15px] leading-none text-black shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-black hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
                      type="text"
                      defaultValue={user.username}
                      required
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Field className="mb-2.5 grid" name="bio">
                  <div className="flex items-baseline justify-between">
                    <Form.Label className="text-[15px] font-medium leading-[35px] text-black">
                      Bio
                    </Form.Label>
                    <Form.Message
                      className="text-[13px] text-rose-900 opacity-80"
                      match="valueMissing"
                    >
                      Enter a Bio here
                    </Form.Message>
                  </div>
                  <Form.Control asChild>
                    <textarea
                      className="box-border inline-flex w-full resize-none appearance-none items-center justify-center rounded bg-blackA2 p-2.5 text-[15px] leading-none text-black shadow-[0_0_0_1px] shadow-blackA6 outline-none selection:bg-blackA6 selection:text-black hover:shadow-[0_0_0_1px_black] focus:shadow-[0_0_0_2px_black]"
                      defaultValue={user.bio}
                      required
                    />
                  </Form.Control>
                </Form.Field>

                <Form.Submit asChild>
                  <button className="mt-2.5 box-border inline-flex h-[35px] w-full items-center justify-center rounded bg-white px-[15px] font-medium leading-none text-violet11 shadow-[0_2px_10px] shadow-blackA4 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
                    save changes
                  </button>
                </Form.Submit>
              </Form.Root>

              <Dialog.Close asChild>
                <button
                  className="absolute right-2.5 top-2.5 inline-flex size-[25px] appearance-none items-center justify-center rounded-full text-violet11 hover:bg-violet4 focus:shadow-[0_0_0_2px] focus:shadow-violet7 focus:outline-none"
                  aria-label="Close"
                >
                  <Cross2Icon />
                </button>
              </Dialog.Close>
            </Dialog.Content>
          </Dialog.Portal>
        </Dialog.Root>
      </div>
      <div className="my-10 flex flex-col border-4 border-violet-700 rounded-2xl w-3/5 py-5 px-10 mx-auto">
        <h2 className="text-xl">{user.username}&apos;s topics:</h2>
        <div>
          <UserTopicsList clerkId={user.clerkid} />
        </div>
      </div>
    </Main>
  );
}
