import React, { useEffect, useState } from 'react';
import Table from './components/table/table';
import ThemeProvider from './myContext/Context';

const App = () => {
  const [color, setColor] = useState(localStorage.getItem("theme") || "white"); 
  const [input, setInput] = useState({ title: "", content: "" });  
  const [inputArr, setInputArr] = useState(JSON.parse(localStorage.getItem("list")) || []);
  const [isOpen, setIsOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    localStorage.setItem("theme", color);
    console.log("Theme Updated:", color);
  }, [color]);

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(inputArr));
  }, [inputArr]);

  return (
    <ThemeProvider bgColor={color}>
      <Table 
        input={input} 
        setColor={setColor} 
        setInput={setInput} 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        inputArr={inputArr}
        setEditIndex={setEditIndex}
        editIndex={editIndex}
        setInputArr={setInputArr}
      />
    </ThemeProvider>
  );
};

export default App;
