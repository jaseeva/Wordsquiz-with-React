import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const AddButton = styled.button`
    float: right;
    font-weight: bold;
    font-size: 16px;
    font-family: Montserrat;
    padding: 10px 20px;
    margin-bottom: 10px;
    border: 2px solid #486D87;
    background: white;
    color: #486D87;
    cursor: pointer;

    &:hover {
        background-color: #486D87;
        color: white;
    }
`;

const FileUpload = () => {
  const [file, setFile] = useState([])

  const handleChange = (event) => {
    //console.log(`selected: `, event.target.files[0])
    setFile(event.target.files[0])
    console.log(`file: `, file)
  }

  const handleSubmit = (event) => {
    const data = new FormData();
    data.append('file', file);
    //console.log(`data: `, data)
    axios.post("/upload", data)
  }

  return (
    <form encType="multipart/form-data" className='upload-form' onSubmit={handleSubmit}>
        <input type='file' accept=".csv" name='newWords' onChange={handleChange} />
        <AddButton type='submit'>Add words</AddButton>
    </form>
  )
}

export default FileUpload;