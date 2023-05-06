import React, { useState } from "react";
import { useRouter } from "next/router";
import { setDoc, doc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { db, storage } from "@/lib/firebase";
import useAuthStore from "@/stores/auth";
import shortid from "shortid";
import Media from "@/types/media";
import Form, { SendType } from "./utils/form/Form";
import Input from "./utils/form/Input";
import File from "./utils/form/File";

import { FaSkullCrossbones } from "react-icons/fa";
import NotLoggedInMessage from "./utils/NotLoggedInMessage";

export default function Create() {
  const { user } = useAuthStore();

  if (user === null) {
    return <NotLoggedInMessage task="upload file" />;
  } else if (user !== null && user !== "loading") {
    return <CreateForm />;
  }

  return <></>;
}

function CreateForm() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [error, setError] = useState("");
  const [uploadIsOn, setUploadIsOn] = useState(false);

  const router = useRouter();
  const { user } = useAuthStore();

  const allowedTypes = ["image", "video", "audio"].map((type) => `${type}/*`);

  const handleSubmit = async (send: SendType) => {
    if (user === null || user === "loading") {
      throw new Error(
        "User is not logged in but tried to create a media! This should not happen!"
      );
    }

    if (!title || !file) {
      setError("Please enter all fields");
      return;
    }

    if (file && !allowedTypes.includes(file.type)) {
      setError("Please select a valid file type");
      return;
    }

    setError("");
    setUploadIsOn(true);

    // TODO: find a better way to do this
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      e.returnValue = "";
    });

    const id = shortid.generate();
    const ext = file?.name.split(".").pop();
    const filename = `${id}.${ext}`;
    const storageRef = ref(storage, `media/${filename}`);
    const uploadTask = uploadBytesResumable(storageRef, file!);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setProgress(progress);
      },
      (error) => {
        setError(error.message);
      },
      async () => {
        const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
        const media: Media = {
          id,
          title,
          url: downloadURL,
          type: file.type,
          userId: user.uid,
          createdAt: new Date(),
        };

        await setDoc(doc(db, "media", id), media);

        window.removeEventListener("beforeunload", (e) => {
          e.preventDefault();
          e.returnValue = "";
        });

        router.push(`/?new=${id}`);
      }
    );
  };

  return (
    <div id="create">
      {uploadIsOn ? (
        <>
          <div className="progress">
            <p className="perc">Uploading {Math.round(progress)}%</p>

            <div
              className="progress-bar"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </>
      ) : (
        <Form
          submitHandler={handleSubmit}
          title="Upload file"
          error={error}
          className="form-full"
        >
          <p className="info">
            Only image, video and audio files are supported
          </p>

          <Input value={title} setValue={setTitle} label="Title" />

          <File setValue={setFile} label="Image, Video or Audio" />

          <button type="submit" className="btn main">
            <FaSkullCrossbones />
          </button>
        </Form>
      )}
    </div>
  );
}
