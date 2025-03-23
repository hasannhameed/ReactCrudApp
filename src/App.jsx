import React, { useEffect, useState } from 'react';
import Table from './components/table/table';
import ThemeProvider from './myContext/Context';


const App = () => {
  const [color,setColor] = useState("black");
  const [input, setInput] = useState({title:"name",content:"content"});
  const [inputArr, setInputArr] = useState([{title:"name",content:"content"}]);
  const [isOpen, setIsOpen] = useState(false);

 


  return (
    <ThemeProvider bgColor={color}>
      <Table 
        input={input} 
        setColor={setColor} 
        setInput={setInput} 
        isOpen={isOpen} 
        setIsOpen={setIsOpen} 
        inputArr={inputArr}
        setInputArr={setInputArr}
        />
    </ThemeProvider>
  )
}

export default App;