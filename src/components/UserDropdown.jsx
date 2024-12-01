import { SignOutButton, UserButton } from "@clerk/nextjs";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import * as Avatar from "@radix-ui/react-avatar";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";

export default async function UserDropdown() {
  const curUser = await currentUser();
  return (
    <DropdownMenu.Root>
      <DropdownMenu.Trigger>
        <Avatar.Root className="inline-flex size-[45px] select-none items-center justify-center overflow-hidden rounded-full  align-middle">
          <Avatar.Image
            className="size-full rounded-[inherit] object-cover"
            alt="username"
          />
          <Avatar.Fallback
            className="leading-1 flex size-full items-center justify-center bg-violet-700 text-[15px] font-medium text-violet11"
            delayMs={600}
          >
            {curUser.username[0].toUpperCase()}
          </Avatar.Fallback>
        </Avatar.Root>
      </DropdownMenu.Trigger>
      <DropdownMenu.Portal>
        <DropdownMenu.Content>
          <DropdownMenu.Label>{curUser.username}</DropdownMenu.Label>
          <DropdownMenu.Item>
            <Link href="/users">Profile</Link>
          </DropdownMenu.Item>
          <DropdownMenu.Item>
            <SignOutButton redirectUrl="/" />
          </DropdownMenu.Item>
          <DropdownMenu.Separator className="m-[5px] h-px bg-violet6" />
          <DropdownMenu.Label>ExtraInfo</DropdownMenu.Label>
          <DropdownMenu.Arrow className="" />
        </DropdownMenu.Content>
      </DropdownMenu.Portal>
    </DropdownMenu.Root>
  );
}
