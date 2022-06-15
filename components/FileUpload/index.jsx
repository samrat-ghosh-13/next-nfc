import React, { useMemo, useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { func, string } from "prop-types";
import styles from "./Fileupload.module.scss";

const baseStyle = {
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 2,
  borderRadius: 10,
  borderColor: "#eeeeee",
  borderStyle: "dotted",
  color: "#bdbdbd",
  outline: "none",
  transition: "border .24s ease-in-out",
  padding: "10px 0",
};
const activeStyle = {
  borderColor: "#2196f3",
};

const acceptStyle = {
  borderColor: "#00e676",
};

const rejectStyle = {
  borderColor: "#ff1744",
};

function FileUpload({ onChange, name, ...props }) {
  function addPreviewUrl(file) {
    Object.assign(file, {
      preview: URL.createObjectURL(file),
    });
    return file;
  }

  const [files, setFiles] = useState([]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const withPreview = acceptedFiles.map((file) => addPreviewUrl(file));
      setFiles([...files, ...withPreview]);
    },
    [files]
  );

  useEffect(() => {
    if (files.length) {
      const data = new FormData();
      for (const content of files) {
        data.append("photo", content);
      }
      onChange(data);
    }
  }, [files]);

  useEffect(() => {
    return () => files.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const removeFile = (file) => (e) => {
    e.preventDefault();
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    open,
    isDragReject,
  } = useDropzone({
    onDrop,
    noClick: true,
    noKeyboard: true,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png"],
    },
    multiple: true,
  });

  const allFiles =
    files.length > 0 &&
    files.map((file) => (
      <div className={styles["file-upload-section--files"]} key={file.path}>
        <div>
          <img
            src={file.preview}
            className={styles["file-upload-section--preview"]}
            onLoad={() => {
              URL.revokeObjectURL(file.preview);
            }}
            alt="file preview"
          />
          {file.path}
        </div>
        <button
          onClick={removeFile(file)}
          className={styles["file-upload-section--btn"]}
        >
          <img
            src="/images/close.svg"
            alt="delete file"
            height={20}
            width={20}
          />
        </button>
      </div>
    ));

  const style = useMemo(
    () => ({
      ...baseStyle,
      ...(isDragActive ? activeStyle : {}),
      ...(isDragAccept ? acceptStyle : {}),
      ...(isDragReject ? rejectStyle : {}),
    }),
    [isDragActive, isDragReject, isDragAccept]
  );
  return (
    <div className="sdh-file-upload">
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} name={name} {...props} />
        {isDragActive ? (
          <p>Drop the files here ...</p>
        ) : (
          <>
            <div className="file-upload-section">
              <span>Drag &amp; Drop or</span>
              <button onClick={open}>browse</button>
            </div>
          </>
        )}
      </div>
      <aside>
        <div>{allFiles}</div>
      </aside>
    </div>
  );
}
FileUpload.defaultProps = {
  name: "",
};

FileUpload.propTypes = {
  onChange: func.isRequired,
  name: string,
};
export default React.memo(FileUpload);
