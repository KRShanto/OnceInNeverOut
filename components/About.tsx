import React from "react";

// icons
import { FaGithub } from "react-icons/fa";
// facebook
import { FaFacebook } from "react-icons/fa";
// gmail
import { FaGoogle } from "react-icons/fa";

export default function About() {
  return (
    <div className="about">
      <h1 className="heading">About our site</h1>

      <div className="text">
        <div className="general">
          <p>
            At Once in Never Out, you can upload your photos, videos, and audio
            files to share with the world. Your content will be displayed on our
            platform for everyone to see, but your personal information will
            always remain private (e.g. your name, email, etc.)
          </p>

          <p>
            Once you upload your media, it becomes a permanent fixture on our
            site. There&apos;s no way to delete or update the content, so please
            only upload things you&apos;re comfortable sharing with others. Keep
            in mind that this is a fun site, so we ask that you don&apos;t
            upload any sensitive or harmful content that could potentially harm
            anyone else.
          </p>

          <p>
            Note that we (the developers) won&apos;t be responsible for any harm
            that may result from the content you upload.
          </p>

          <p>
            Join our community and share your memories with the world, knowing
            that they&apos;ll be preserved for all time on Once in Never Out.
          </p>

          <p>
            As a final reminder, if you have any questions or concerns, feel
            free to reach out to us, and we&apos;ll be happy to help. Thank you
            for using Once in Never Out!
          </p>
        </div>

        <hr />

        <div className="developer">
          <p>
            Actually this is a hobby project of mine. So don&apos;t worry about
            the text above. If you have uploaded something you don&apos;t want
            to share with the world, just contact me and I will delete it.
          </p>

          <p>
            This site is made with Next.js, TypeScript, Sass and Firebase. This
            site is open source and you can find the source code on github. Give
            me a star if you like it. You can find the links below.
          </p>

          <p>
            <i>
              <b>
                Very very thanks for visiting my site. I hope you will enjoy it.
                You can also consider hiring me for your next project.
              </b>
            </i>
          </p>
        </div>
      </div>

      <div className="contact">
        <a href="https://github.com/KRShanto/OnceInNeverOut" className="github">
          <FaGithub />
        </a>
        <a href="https://www.facebook.com/KRshanto2005" className="facebook">
          <FaFacebook />
        </a>
        <a href="mailto:krshanto2005@gmail.com" className="google">
          <FaGoogle />
        </a>
      </div>
    </div>
  );
}
