
import { React, useEffect } from "react";

const List = ({ inputArr, modalControler }) => {

  useEffect(()=>{
    console.log(inputArr);
  },[inputArr])

  return (
    <tbody style={{ cursor: "pointer" }}>
      {inputArr.map((obj, index) => (
        <tr key={index} onClick={() => { modalControler(index)}}>
          <td>{obj.title}</td>
          <td><button className="btn btn-danger">delete</button></td>
        </tr>
      ))}
    </tbody>
  );
};

export default List;
