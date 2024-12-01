import { SignIn } from "@clerk/nextjs";
import Main from "@/components/Main";
export default function Page() {
  return (
    <Main>
      <SignIn />
    </Main>
  );
}
