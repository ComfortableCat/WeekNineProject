import * as Form from "@radix-ui/react-form";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { handleSubmit } from "@/lib/serveraction";

export default function CommentForm({ topicId, parentId }) {
  console.log("Comment form id values " + topicId, parentId);

  return (
    <div>
      <Form.Root name="comment form" action={handleSubmit}>
        <Form.Field name="reply">
          <div>
            <Form.Label>Reply:</Form.Label>
            <Form.Message
              className="text-[13px] text-black opacity-80"
              match="valueMissing"
            >
              Please enter a topic title
            </Form.Message>
          </div>
          <Form.Control asChild>
            <textarea maxLength={144} type="text" required />
          </Form.Control>
        </Form.Field>

        <Form.Field>
          <Form.Control asChild>
            <input
              type="text"
              name="topicId"
              value={topicId}
              defaultValue={topicId}
            />
          </Form.Control>
        </Form.Field>
        <Form.Field>
          <Form.Control asChild>
            <input
              type="text"
              name="parentId"
              value={parentId}
              defaultValue={parentId}
            />
          </Form.Control>
        </Form.Field>

        <Form.Submit asChild>
          <button className="mt-2.5 box-border inline-flex h-[35px] w-full items-center justify-center rounded bg-white px-[15px] font-medium leading-none text-violet11 shadow-[0_2px_10px] shadow-blackA4 hover:bg-mauve3 focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none">
            send reply
          </button>
        </Form.Submit>
      </Form.Root>
    </div>
  );
}
