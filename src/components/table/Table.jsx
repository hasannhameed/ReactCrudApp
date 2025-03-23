import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../../myContext/Context";
import Modal from "../modal/Modal";
import List from "../list/List";


const Table = ({input,setColor,setInput,isOpen,setIsOpen, inputArr,setInputArr}) => {

    const {bgColor} = useContext(ThemeContext);

    const chnageColor = ()=>{
      setColor(prevColor => prevColor === "white" ? "black" : "white")
    }

    const modalControler = () => {
      setIsOpen(pre=>pre?false:true);
    }
    
    

  return (
   
    <div className="container w-50 d-flex flex-column  mt-5">
        <div className="m-1">
          <button className='btn btn-dark me-1' onClick={chnageColor} >Change theme</button>
          <button  className="btn btn-info" onClick={modalControler}>open modal</button>
        </div>
        <div style={{backgroundColor:bgColor==="black"?"white":"black", color:bgColor=== "black"?"black":"white"}}> 
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <List inputArr={inputArr} />
              <Modal setInputArr={setInputArr} isOpen={isOpen} input={input} setInput={setInput} modalControler={modalControler}/>
            </table>
           
        </div>
    </div>
  );
};

export default Table;
