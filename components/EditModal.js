import React, { useState } from 'react';

const EditModal = ({ isOpen, initialValue, onSave, onCancel }) => {
  const [editedValue, setEditedValue] = useState(initialValue);

  const handleSave = () => {
    onSave(editedValue);
  };

  console.log("modal de editar", isOpen)

  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        <input
          type="text"
          value={editedValue}
          onChange={(e) => setEditedValue(e.target.value)}
        />
        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
};

export default EditModal;
