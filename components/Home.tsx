import React, { useState, useEffect } from "react";
import useAuthStore from "@/stores/auth";
import Link from "next/link";
import { quotes } from "@/lib/quotes";
import Media from "@/types/media";
import { getDocs, collection, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import useLoadingStore from "@/stores/loading";

import { BsFillImageFill } from "react-icons/bs";
import { BsFillCameraVideoFill } from "react-icons/bs";
import { BsFillMusicPlayerFill } from "react-icons/bs";
import { BsBoxArrowUpRight } from "react-icons/bs";
import { BsClipboard } from "react-icons/bs";

export default function Home() {
  const { user } = useAuthStore((state) => state);

  if (user !== null && user !== "loading") {
    return <DisplayMedia />;
  } else if (user === null) {
    return <Intro />;
  }

  return <></>;
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
    <div className="intro">
      <p className="quote">{quote}</p>

      <Link href="/signup" className="btn main">
        Get Started
      </Link>
    </div>
  );
}

function DisplayMedia() {
  const [media, setMedia] = useState<Media[]>([]);
  const { user } = useAuthStore((state) => state);
  const { turnOn, turnOff } = useLoadingStore();
  const [noMedia, setNoMedia] = useState(false);

  useEffect(() => {
    // Get the media from firestore where userId is equal to the current user's uid
    async function getMedia() {
      if (user === null || user === "loading") {
        throw new Error(
          "User is not logged in but tried to get media! This should not happen!"
        );
      }

      turnOn();

      const q = query(collection(db, "media"), where("userId", "==", user.uid));

      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        setNoMedia(true);
      } else {
        querySnapshot.forEach((doc) => {
          setMedia((prev) => [...prev, doc.data() as Media]);
        });
      }
      turnOff();
    }

    getMedia();
  }, []);

  return (
    <>
      <div className="media-section">
        {noMedia ? (
          <div className="no-media">
            <h2 className="heading">No media found!</h2>
            <p className="text">
              You can upload media by clicking the plus button in the bottom.
            </p>
          </div>
        ) : (
          media.map((m, i) => (
            <div className="media" key={i}>
              <div className="title-icons">
                {m.type.includes("image") && (
                  <BsFillImageFill className="icon pic" />
                )}

                {m.type.includes("video") && (
                  <BsFillCameraVideoFill className="icon vid" />
                )}

                {m.type.includes("audio") && (
                  <BsFillMusicPlayerFill className="icon aud" />
                )}
                <h3 className="title">{m.title}</h3>
              </div>

              <div className="options">
                <Link href={`/${m.id}`} className="option" target="_blank">
                  <BsBoxArrowUpRight className="icon" />
                </Link>

                <button
                  className="option"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      `${window.location.origin}/${m.id}`
                    );
                  }}
                >
                  <BsClipboard className="icon" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </>
  );
}
