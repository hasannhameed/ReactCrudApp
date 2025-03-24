import React, { useEffect, useState } from 'react';

const Form = ({ input, setInput, setInputArr, inputArr, editIndex, viewMode }) => {
    const [message, setMessage] = useState("");
    const [messageType, setMessageType] = useState("success"); 

    useEffect(() => {
        if (editIndex !== null && inputArr[editIndex]) {
            setInput(inputArr[editIndex]);  
        }
    }, [editIndex, inputArr, setInput]);

    useEffect(() => {
        if (message) {

            const timer = setTimeout(() => {
                setMessage("");
            }, 2000); 

            return () => clearTimeout(timer); 
        }
    }, [message]);

    const handleChange = (e) => {
        if (viewMode) return; 
        const { name, value } = e.target;
        setInput(prev => ({ ...prev, [name]: value }));
    };

    const addToList = () => {
        if (input.title === "" || input.content === "") {
            setMessage("Fields cannot be empty!");
            setMessageType("danger"); 
            return;
        }

        if (editIndex !== null) {
            setInputArr(prev => prev.map((item, index) => (index === editIndex ? input : item)));
            setMessage("Edited successfully!");
            setMessageType("success");
        } else {
            setInputArr(prev => [...prev, input]);
            setMessage("Added successfully!");
            setMessageType("success");
        }

        setInput({ title: "", content: "" });
    };

    return (
        <div className='row my-4'>
            {message && <div className={`alert text-start  alert-${messageType}`}>{message}</div>}

            <div className="mb-3">
                
                {viewMode 
                ? (<p className='form-control-plaintext'><b>Titie :</b> {input.title}</p>) 
                : (
                    <input 
                        value={input.title}
                        name="title"  
                        type="text" 
                        className='form-control' 
                        placeholder='Enter title'
                        onChange={handleChange}
                    />
                )}
            </div>
            
            <div className="form-floating mb-3">
            {viewMode?( <p> 
                <b>Content :  </b>
                {input.content} 
                </p> ):(
                <textarea
                    name="content"  
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "100px" }}
                    value={input.content} 
                    onChange={handleChange} 
                    readOnly={viewMode}
                />
            )}
                
            </div>

            {!viewMode && (
                <div className="form-floating mb-3">
                    <button className='btn btn-primary' onClick={addToList}>
                        {editIndex === null ? "Add" : "Edit"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default Form;
