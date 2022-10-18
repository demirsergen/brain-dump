import React from "react";

const Modal = ({ handleModal, deleteId }) => {
  return (
    <div className="border-2 text-white w-3/4 mx-auto p-4">
      <h1 className="text-white bg-red-300 py-2 text-center">Are you sure?</h1>
      <div className="flex gap-4 justify-center py-2">
        <button
          className="text-red-500 bg-teal-50 p-2"
          onClick={() => handleModal("delete", deleteId)}
        >
          Delete
        </button>
        <button
          className="text-black bg-teal-50 p-2"
          onClick={() => handleModal("cancel")}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default Modal;
