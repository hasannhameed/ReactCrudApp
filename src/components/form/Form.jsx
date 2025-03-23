import React from 'react';

const Form = ({ input, setInput,setInputArr }) => {

   

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInput(prev => ({ ...prev, [name]: value })); 
    };

    const addToList = () => {
        setInputArr(prev => [...prev,input]);
    }

    return (
        <div className='row my-4'>
            
            <div className="mb-3">
                <input 
                    value={input.title} 
                    name="title"  
                    type="text" 
                    className='form-control' 
                    placeholder='Enter title'
                    onChange={handleChange}
                />
            </div>

            
            <div className="form-floating mb-3">
                <textarea
                    name="content"  
                    className="form-control"
                    placeholder="Leave a comment here"
                    id="floatingTextarea2"
                    style={{ height: "100px" }}
                    value={input.content} 
                    onChange={handleChange} 
                />
            </div>

            
            <div className="form-floating mb-3">
                <button className='btn btn-primary' onClick={addToList}>Add to List</button>
            </div>
        </div>
    );
};

export default Form;
