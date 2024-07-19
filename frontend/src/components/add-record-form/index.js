import React, { useState } from 'react';

import styles from './style.module.css'

const AddRecordForm = ({ onAdd }) => {
  const [description, setDescription] = useState('');
  const [createDate, setCreateDate] = useState('');
  const [data, setData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newItem = {
      id: Date.now(),
      description,
      create_date: createDate,
      data: JSON.parse(data)
    };
    onAdd(newItem);
  };
  

  return (
    <form className={styles.formBlock} onSubmit={handleSubmit}>
      <div className={styles.formDiv}>
        <label className={styles.inputLabel}>Description:</label>
        <input
          className={styles.inputField}
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>
      <div>
        <label className={styles.inputLabel}>Create Date:</label>
        <input
          className={styles.inputField}
          type="date"
          value={createDate}
          onChange={(e) => setCreateDate(e.target.value)}
          required
        />
      </div>
      <div>
        <label className={styles.inputLabel}>Data (JSON format):</label>
        <textarea
          className={styles.inputField}
          value={data}
          onChange={(e) => setData(e.target.value)}
          required
        />
      </div>
      <button type="submit">Add Record</button>
    </form>
  );
};

export default AddRecordForm;