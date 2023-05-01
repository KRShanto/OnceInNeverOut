import React from "react";
import useAuthStore from "@/stores/auth";
import { FaRunning } from "react-icons/fa";
import { IoMdAddCircleOutline } from "react-icons/io";
import { FiInfo } from "react-icons/fi";
import Link from "next/link";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  const path = router.asPath;

  return (
    <footer>
      <Link href="/about">
        <FiInfo className="info" />
      </Link>

      <Link href="/create">
        <IoMdAddCircleOutline className="create" />
      </Link>

      <Link href={`/logout?prev=${path}`}>
        <FaRunning className="logout" />
      </Link>
    </footer>
  );
}
