import React, { useState, useEffect } from "react";
import useAuthStore from "@/stores/auth";
import { useRouter } from "next/router";
import Link from "next/link";
import { quotes } from "@/lib/quotes";
import Media from "@/types/media";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function Home() {
  const { user } = useAuthStore((state) => state);

  if (user !== null && user !== "loading") {
    return <DisplayMedia />;
  } else if (user === null) {
    return <Intro />;
  }
}

function Intro() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

    // Set the quote slowly
    let i = 0;
    const interval = setInterval(() => {
      setQuote(randomQuote.slice(0, i));
      i++;
      if (i > randomQuote.length) {
        clearInterval(interval);
      }
    }, 50);
  }, []);

  return (
    <>
      <p className="quote">{quote}</p>

      <Link href="/signup" className="btn">
        Get Started
      </Link>
    </>
  );
}

function DisplayMedia() {
  const [media, setMedia] = useState<Media[]>([]);
  const { user } = useAuthStore((state) => state);

  useEffect(() => {
    // Get the media from firestore where userId is equal to the current user's uid
    async function getMedia() {
      if (user === null || user === "loading") {
        throw new Error("User is not logged in but tried to get media");
      }
      const q = query(collection(db, "media"), where("userId", "==", user.uid));

      const querySnapshot = await getDocs(q);

      querySnapshot.forEach((doc) => {
        setMedia((prev) => [...prev, doc.data() as Media]);
      });
    }

    getMedia();
  }, []);

  return (
    <>
      <h2>My Media</h2>

      <div className="media-section">
        {media.map((m, i) => (
          <div className="media" key={i}>
            <h3>{m.title}</h3>
          </div>
        ))}
      </div>
    </>
  );
}
