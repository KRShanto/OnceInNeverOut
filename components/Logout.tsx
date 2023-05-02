import React from "react";
import { useRouter } from "next/router";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import Link from "next/link";

export default function Logout() {
  const router = useRouter();
  const { prev } = router.query as { prev: string };

  return (
    <div className="logout">
      <h3 className="title">Are you sure you want to logout?</h3>

      <div className="options">
        <button
          className="option danger"
          onClick={() => {
            signOut(auth);
            router.push("/");
          }}
        >
          Yes
        </button>

        <Link className="option cancel" href={prev || "/"}>
          Back
        </Link>
      </div>
    </div>
  );
}
