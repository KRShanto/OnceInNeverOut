import "@/styles/globals.scss";
import type { AppProps } from "next/app";
import useLoadingStore from "@/stores/loading";
import { BounceLoader } from "react-spinners";
import { auth } from "@/lib/firebase";
import { useEffect } from "react";
import useAuthStore from "@/stores/auth";
import LoadingBar from "react-top-loading-bar";
import Navbar from "@/components/Navbar";
import { useState } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function App({ Component, pageProps }: AppProps) {
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  const { loading, turnOff, turnOn } = useLoadingStore((state) => state);
  const { setUser } = useAuthStore((state) => state);

  useEffect(() => {
    auth.onAuthStateChanged((user: any) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email || "",
          name: user.displayName || "",
          photoURL: user.photoURL,
        });
      } else {
        turnOn();
        setTimeout(() => {
          setUser(null);
          turnOff();
        }, 2000);
      }
    });
  }, []);

  // Progress bar
  useEffect(() => {
    const handleStart = (url: string) => {
      setProgress(30);
    };
    const handleComplete = (url: string) => {
      setProgress(100);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  return (
    <>
      <LoadingBar
        color="rgb(0, 255, 208)"
        height={3}
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />

      {loading && (
        <div className="preloader">
          <BounceLoader className="spinner" color="cyan" loading={loading} />
        </div>
      )}

      <main>
        <Navbar />
        <Component {...pageProps} />
      </main>
    </>
  );
}
