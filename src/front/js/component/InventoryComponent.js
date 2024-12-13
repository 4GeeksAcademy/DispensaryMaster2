import React, { useState } from 'react';
import { importInventory } from './inventory';

const Inventory = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return alert('Please select a file');
    const result = await importInventory(file);
    alert(result.message || 'Import completed');
  };

  return (
    <div>
      <h1>Import Inventory</h1>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default Inventory;
