import React, { useEffect } from "react";

const List = ({ inputArr, modalControler, setInputArr }) => {
    useEffect(() => {
        console.log(inputArr);
    }, [inputArr]);

    const remove = (index) => {
        setInputArr(prev => prev.filter((_, i) => i !== index));
    };

    // Function to determine badge class based on priority
    const getBadgeClass = (priority) => {
        switch (priority) {
            case "High":
                return "badge bg-danger";
            case "Medium":
                return "badge bg-warning"; 
            case "Low":
                return "badge bg-success";
            default:
                return "badge bg-primary";
        }
    };

    return (
        <tbody>
            {inputArr.map((obj, index) => (
                <tr key={index}>
                    <td>{obj.title}</td>
                    <td><span className={getBadgeClass(obj.priority)}>Mediuam</span></td>
                    <td>
                        <button className="btn btn-danger btn-sm me-1" onClick={() => remove(index)}>🗑 <span className="d-none d-sm-inline">Delete</span></button>
                        <button className="btn btn-primary btn-sm me-1" onClick={() => modalControler(index, "view")}>👀 <span className="d-none d-sm-inline">View</span> </button>
                        <button className="btn btn-warning btn-sm" onClick={() => modalControler(index)}>✏️<span className="d-none d-sm-inline"> Edit</span></button>
                    </td>
                </tr>
            ))}
        </tbody>
    );
};

export default List;
