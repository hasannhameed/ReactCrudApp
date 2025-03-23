import React from "react";
import { useContext } from "react";
import { ThemeContext } from "../../myContext/Context";
import Modal from "../modal/Modal";
import List from "../list/List";


const Table = ({input,setColor,setInput,isOpen,setIsOpen, inputArr,setInputArr,setEditIndex,editIndex}) => {

    const {bgColor} = useContext(ThemeContext);
   

    const chnageColor = ()=>{
      setColor(prevColor => prevColor === "white" ? "black" : "white")
    }

    const modalControler = (index = null) => {
      setIsOpen(pre=>pre?false:true);
      setEditIndex(index)
      console.log(index);
      if(!isOpen){
        setInput({ title:"", content:''});
      }
      
    }
    
    

  return (
   
    <div className="container w-50 d-flex flex-column  mt-5">
        <div className="m-1">
          <button className='btn btn-dark me-1' onClick={chnageColor} >Change theme</button>
          <button  className="btn btn-info" onClick={() => modalControler(null)}>open modal</button>
        </div>
        <div style={{backgroundColor:bgColor==="black"?"white":"black", color:bgColor=== "black"?"black":"white"}}> 
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Action</th>
                </tr>
              </thead>
              <List inputArr={inputArr} modalControler={modalControler} setInputArr={setInputArr}/>
              <Modal inputArr={inputArr} setInputArr={setInputArr} isOpen={isOpen} input={input} setInput={setInput} modalControler={modalControler} editIndex={editIndex}/>
            </table>
           
        </div>
    </div>
  );
};

export default Table;
