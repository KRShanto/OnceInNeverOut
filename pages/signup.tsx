import Signup from "@/components/Signup";
import React from "react";
import Head from "next/head";

export default function SignupPage() {
  return (
    <>
      <Head>
        <title>Create new Account</title>
      </Head>

      <Signup />
    </>
  );
}
