import Link from "next/link";
import { SignInButton, SignedOut, SignedIn } from "@clerk/nextjs";
import UserDropdown from "./UserDropdown";

export default function Header() {
  return (
    <header className="flex h-[100px] shadow-md justify-between content-center px-14 py-5 sticky top-0 z-50 ">
      <div className="flex gap-10 align-middle ">
        <Link href="/">
          <h1 className="text-6xl font-mono text-center align-middle">
            Talker
          </h1>
        </Link>
        <Link href="/topics">Topics</Link>
        <SignedIn>
          <Link href="/newtopic">Create New Topic</Link>
        </SignedIn>
      </div>
      <div>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserDropdown />
        </SignedIn>
      </div>
    </header>
  );
}
