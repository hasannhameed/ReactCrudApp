import {React,useEffect} from 'react';

const List = ({ inputArr, modalControler }) => {

  return (
    <tbody style={{ cursor: "pointer" }}>
      {inputArr.map((obj, index) => (
        <tr key={index} onClick={modalControler}>
          <td>{obj.title}</td>
          <td>{obj.content}</td>
        </tr>
      ))}
      
    </tbody>
  );
};

export default List;
