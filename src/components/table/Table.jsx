import React, { useContext, useState } from "react";
import { ThemeContext } from "../../myContext/Context";
import Modal from "../modal/Modal";
import List from "../list/List";

const Table = ({ input, setColor, setInput, isOpen, setIsOpen, inputArr, setInputArr, setEditIndex, editIndex }) => {
    const { bgColor } = useContext(ThemeContext);
    const [viewMode, setViewMode] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");

    const changeColor = () => {
        setColor(prevColor => (prevColor === "white" ? "black" : "white"));
    };

    const modalControler = (index = null, mode = "edit") => {
        setIsOpen(prev => !prev);
        setViewMode(mode === "view");
        setEditIndex(index);
        if (!isOpen) {
            setInput({ title: "", content: "", priority: "Normal" });
        }
    };

 
        const filteredList = inputArr.filter(item =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
   

   

    return (
        <div className="container w-100 w-md-50 mt-5">
           
            <div className=" row d-flex justify-content-between align-items-center mb-3">
              <div className=" mb-3 mb-md-0 col-sm-3 col-12 d-flex justify-content-between align-items-center">
                <button className="btn btn-dark me-3" onClick={changeColor}>Change Theme</button>
                <button className="btn btn-info" onClick={() => modalControler(null)}>➕ Add Task</button>
              </div>
              
              <div className=" col-sm-6 col-12 d-flex justify-content-between align-items-center">
                <input
                      type="text"   
                      className="form-control float-right me-2 "
                      placeholder="🔍 Search tasks..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                  />
              </div>
            </div>

           
            <div className={`card  p-3 shadow bg-${bgColor === "black" ? "dark" : "light"} text-${bgColor === "black" ? "white" : "dark"}`}>
                <table className="table table-striped table-hover">
                    <thead className="table-dark">
                        <tr>
                            <th>Title</th>
                            <th>Priority</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <List inputArr={filteredList} modalControler={modalControler} setInputArr={setInputArr} />
                </table>
            </div>

            
            <Modal 
                inputArr={inputArr} 
                setInputArr={setInputArr} 
                isOpen={isOpen} 
                input={input} 
                setInput={setInput} 
                modalControler={modalControler} 
                editIndex={editIndex} 
                viewMode={viewMode} 
            />
        </div>
    );
};

export default Table;
