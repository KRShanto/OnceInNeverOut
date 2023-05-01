import React, { useState } from "react";
import Dropzone from "react-dropzone";

export interface InputProps {
  label: string;
  setValue: (value: any) => void;
  className?: string;
}

// TODO: Style this component
export default function File({ label, setValue, className }: InputProps) {
  const [file, setFile] = useState<any>(null);

  const onDrop = (acceptedFiles: any) => {
    setFile(acceptedFiles[0]);
    setValue(acceptedFiles[0]);
  };

  return (
    <Dropzone onDrop={onDrop}>
      {({ getRootProps, getInputProps }) => (
        <div
          {...getRootProps()}
          className={`drag ${file ? "active" : ""} ${className}`}
        >
          <input {...getInputProps()} />
          {file ? (
            <div className="file-info">
              <p className="file-name">{file.name}</p>
              <p className="file-size">{Math.round(file.size / 1000000)} MB</p>
            </div>
          ) : (
            <p>
              Drag {label} here, or click to select {label}
            </p>
          )}
        </div>
      )}
    </Dropzone>
  );
}
