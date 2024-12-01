import Link from "next/link";

export default function NotFound() {
  return (
    <div>
      <div>
        <h2>User Not Found</h2>
        <p>The User profile you were looking for could not be located</p>
        <Link href="/">Return to the homepage</Link>
      </div>
    </div>
  );
}
