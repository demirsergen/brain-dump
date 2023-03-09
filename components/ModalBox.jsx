import React from 'react';

const ModalBox = ({ callback }) => {
  return (
    <div className="border-2 text-white w-3/4 mx-auto p-4 md:w-1/3 rounded">
      <h1 className="text-white bg-red-300 py-2 text-center">
        Are you sure?
      </h1>
      <div className="flex gap-4 justify-center py-2">
        <button
          className="text-red-500 bg-teal-50 p-2 rounded"
          onClick={() => callback('delete')}
        >
          Delete
        </button>
        <button
          className="text-black bg-teal-50 p-2 rounded"
          onClick={() => callback('cancel')}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default ModalBox;
