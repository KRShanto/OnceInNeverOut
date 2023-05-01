import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { getDoc, doc } from "firebase/firestore";
import { db, storage } from "@/lib/firebase";
import Media from "@/types/media";
import { pictureExt, videoExt, audioExt } from "@/lib/mediaExt";
import useLoadingStore from "@/stores/loading";
import Image from "next/image";

export default function Showcase() {
  const router = useRouter();
  const { id } = router.query;
  const { turnOn, turnOff } = useLoadingStore();

  const [media, setMedia] = useState<Media | null>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function getMedia() {
      turnOn();
      const docRef = doc(db, "media", id as string);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const media = docSnap.data() as Media;
        setMedia(media);
      } else {
        setNotFound(true);
      }

      turnOff();
    }

    if (id) getMedia();
  }, [id]);

  if (notFound) return <div>Media not found</div>;

  if (media && pictureExt.includes(media.type)) {
    return <ShowPicture media={media} />;
  } else if (media && videoExt.includes(media.type)) {
    return <ShowVideo media={media} />;
  } else if (media && audioExt.includes(media.type)) {
    return <ShowAudio media={media} />;
  }

  return <></>;
}

function ShowPicture({ media }: { media: Media }) {
  return (
    <>
      <div className="picture section">
        <h3 className="title">{media.title}</h3>

        <Image src={media.url} alt={media.title} width={500} height={500} />
      </div>
    </>
  );
}

function ShowVideo({ media }: { media: Media }) {
  return (
    <>
      <div className="video section">
        <h3 className="title">{media.title}</h3>

        <video controls>
          <source src={media.url} type={media.type} />
        </video>
      </div>
    </>
  );
}

function ShowAudio({ media }: { media: Media }) {
  return (
    <>
      <div className="audio section">
        <h3 className="title">{media.title}</h3>

        <audio controls src={media.url} />
      </div>
    </>
  );
}
