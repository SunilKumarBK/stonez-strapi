import React, { useState } from 'react';
import './document.css';
import axios from 'axios';
import apiUrl from '../../../Api/ApiUrl';

const Documents = () => {
  const [document, setDocument] = useState({ name: '', image: null });

  const handleFileChange = (e) => {
    setDocument({
      ...document,
      name: e.target.value,
    });
  };

  console.log(document, 'document');

  const handleSubmit = async () => {
    if (!document.image) {
      console.error('No document file selected');
      return;
    }

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('data', JSON.stringify({
        name: document.name,
      }));

      formDataToSend.append('files.image', document.image);

      const response = await axios.post(`${apiUrl}/api/documents`, formDataToSend);

      const data = response.data; // No need for response.json() with axios

      console.log('Document uploaded successfully', data);

      // Reset the state after successful upload
      setDocument({ name: '', image: null });
    } catch (error) {
      console.error('Error uploading document:', error);
    }
  };

  return (
    <div className="documentContainer">
      <label htmlFor="documentName">Document Name:</label>
      <input type="text" id="documentName" name="documentName" value={document.name} onChange={handleFileChange} />
      <br />
      <label htmlFor="uploadDocument">Upload Document:</label>
      <input type="file" id="uploadDocument" name="file" onChange={(e) => setDocument({ ...document, image: e.target.files[0] })} />
      <br />
      <ul>
        <li>Document Name 1</li>
        <li>Document Name 2</li>
        <li>Document Name 2</li>
      </ul>
      <button onClick={handleSubmit}>Upload</button>
    </div>
  );
};

export default Documents;
