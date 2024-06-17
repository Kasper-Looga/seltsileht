import "./App.css";
import Button from "./components/Buttontest";
import Background from "./Images/Background.png";
import Logo from "./Images/Logo1.png";
import React, { useEffect, useState } from "react";
import axios from "axios";

console.log(Logo);
console.log(Background);

function App() {
  
  const [displayItems, setDisplayItems] = useState(false)
  const [data, setData] = useState([])

  
  const fetchData = async () => {
    try{
      const response = await axios.get("http://localhost:5000/Data");
      setData(response.data);
    }catch(error){
      console.error("Error Fetchind data", error);
    }
  };

 
  return (
    <div className="App">
      <header className="App-header">
        <img src={Logo} className="App-logo" alt="Logo peaks siin olema" />

        <Button onClick={fetchData}>click me</Button>
        {displayItems && (
          <div>{data.map(item =>(
              <div key={item._id}>{item.name}: {item.value}</div>
          ))}
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
