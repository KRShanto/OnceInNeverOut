import React from "react";

export default function Progress({ progress }: { progress: number }) {
  return (
    <>
      {progress > 0 && (
        <div className="progress">
          <p className="perc">{Math.round(progress)}%</p>

          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      )}
    </>
  );
}
