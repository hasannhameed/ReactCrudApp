
import { React, useEffect } from "react";

const List = ({ inputArr, modalControler, setInputArr }) => {

  useEffect(()=>{
    console.log(inputArr);
  },[inputArr])

  const remove = (index) =>{
    setInputArr(prev=>prev.filter((_,i)=>i !== index))
  }

  return (
    <tbody style={{ cursor: "pointer" }}>
      {inputArr.map((obj, index) => (
        <tr key={index}>
          <td >{obj.title}</td>
          <td>
            <button className="btn btn-danger " onClick={()=>{remove(index)}}>delete</button>
            <button className="btn btn-primary ms-1" onClick={()=>{modalControler(index,obj)}}>view</button>
            <button className="btn btn-warning ms-1"  onClick={() => { modalControler(index)}}>edit</button>
          </td>
        </tr>
      ))}
    </tbody>
  );
};

export default List;
