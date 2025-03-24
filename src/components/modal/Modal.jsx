import React from "react";
import Portal from "../Portal/Portal";
import Form from "../form/Form";
import "./Modal.css"; 

const Modal = ({ input, isOpen, modalControler, setInput ,setInputArr,inputArr,editIndex,viewMode}) => {
  if (!isOpen) return null;

  return (
    <Portal>
      <div className="modal-overlay d-flex align-items-center justify-content-center">
        <div className="modal-content bg-white p-4 rounded shadow-lg">

            {editIndex !== null 
            ? ( <h2 className="text-dark">{viewMode ? "View Mode" : "Edit Mode"}</h2>) 
            : ( <h2 className="text-dark">Add new list</h2> )}

             <Form viewMode={viewMode} setInput={setInput} input={input} setInputArr={setInputArr} editIndex={editIndex} inputArr={inputArr}/>
             <button className="btn btn-danger mt-3" onClick={modalControler}>
              Close the modal
          </button>
        </div>
      </div>
    </Portal>
  );
};

export default Modal;
