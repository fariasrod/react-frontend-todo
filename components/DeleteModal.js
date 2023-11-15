import React from 'react';

const DeleteModal = ({ isOpen, onConfirm, onCancel }) => {
  console.log("modal de excluir", isOpen)

    if (!isOpen) return null;
  
    return (
      <div className="modal">
        <div className="modal-content">
          <p>Remove?</p>
          <button onClick={onConfirm}>Yes</button>
          <button onClick={onCancel}>Cancel</button>
        </div>
      </div>
    );
};

export default DeleteModal;
