import React, { useState } from "react";
import Form, { SendType } from "@/components/utils/form/Form";
import Input from "@/components/utils/form/Input";
import { auth } from "@/lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import Link from "next/link";
import { useRouter } from "next/router";
import useLoadingStore from "@/stores/loading";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const router = useRouter();
  const { turnOn, turnOff } = useLoadingStore();

  async function submitHandler(send: SendType) {
    if (email === "" || password === "") {
      setError("Please fill in all fields");
      return;
    }

    try {
      setError("");
      turnOn();

      // Create account
      await createUserWithEmailAndPassword(auth, email, password);

      turnOff();
      // redirect home
      router.push("/");
    } catch (error: any) {
      setError(error.message);
    }
  }

  return (
    <div id="signup">
      <Form
        submitHandler={submitHandler}
        error={error}
        title="Create Account"
        className="form-full"
      >
        <Input
          type="email"
          label="Your Email"
          value={email}
          setValue={setEmail}
        />
        <Input
          type="password"
          label="Your Password"
          value={password}
          setValue={setPassword}
        />

        <p className="msg">
          Already have an account? <Link href="/login">Login</Link>
        </p>

        <button type="submit" className="btn main">
          Create
        </button>
      </Form>
    </div>
  );
}
