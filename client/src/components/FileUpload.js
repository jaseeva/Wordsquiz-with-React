import React, { useState } from "react";
import axios from "axios";
import ActionButton from "./ActionButton";

const FileUpload = () => {
  const [file, setFile] = useState([]);

  const handleChange = event => {
    //console.log(`selected: `, event.target.files[0])
    setFile(event.target.files[0]);
    console.log(`file: `, file);
  };

  const handleSubmit = event => {
    const data = new FormData();
    data.append("file", file);
    //console.log(`data: `, data)
    axios.post("/upload", data);
  };

  return (
    <form
      encType="multipart/form-data"
      className="upload-form"
      onSubmit={handleSubmit}
    >
      <input
        type="file"
        accept=".csv"
        name="newWords"
        onChange={handleChange}
      />
      <ActionButton type="submit" text="Add words" />
    </form>
  );
};

export default FileUpload;
