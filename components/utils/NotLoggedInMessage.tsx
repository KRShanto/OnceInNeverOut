import Link from "next/link";
import React from "react";
import { useRouter } from "next/router";

export default function NotLoggedInMessage({ task }: { task: string }) {
  const router = useRouter();
  // current path
  const path = router.asPath;

  return (
    <div className="not-logged-in">
      <h2 className="heading">You need to be logged in to {task}</h2>
      <Link href={`/login?prev=${path}`} className="link">
        Go To Login
      </Link>
    </div>
  );
}
