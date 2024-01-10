import React, { useState } from 'react';

const Documents = () => {
  const [documentList, setDocumentList] = useState([]);
  const [documentName, setDocumentName] = useState('');

  const handleUpload = () => {
  };

  const handleDownload = (documentId) => {
  };

  const handleDelete = (documentId) => {
  };

  return (
    <div>
      <h2>Documents sdfsdf</h2>
      <input type="file" onChange={(e) => setDocumentName(e.target.files[0].name)} />
      <button onClick={handleUpload}>Upload Document</button>

      <ul>
        {documentList.map((document, index) => (
          <li key={index}>
            {document.name} - {document.type} - {document.date}
            <button onClick={() => handleDownload(document.id)}>Download</button>
            <button onClick={() => handleDelete(document.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Documents;
