import Link from "next/link";
import React from "react";

export default function Navbar() {
  return (
    <nav>
      <Link href="/">
        <h1 className="logo">Once in Never out</h1>
      </Link>
    </nav>
  );
}
