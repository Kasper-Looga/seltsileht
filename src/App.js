import "./App.css";
import Button from "./components/Buttontest";
import Background from "./Images/Background.png";
import Logo from "./Images/Logo1.png";
import React, { useEffect, useState } from "react";
import axios from "axios";

console.log(Logo);
console.log(Background);

function App() {
  const [data, setData] = useState([])
  const [displayItems, setDisplayItems] = useState("")
  
  

  
  const fetchData = async (field) => {
    try{
      console.log("fetching data...");
      const response = await axios.get("http://localhost:5000/Data");
      console.log("fetched data",response.data);
      setData(response.data);
      setDisplayItems(displayItems === field ? "" : field);
      console.log("display items",displayItems);
      

    }catch(error){
      console.error("Error Fetchind data", error);
    }
  };

  useEffect(() => {
    console.log("displayitmes:", displayItems);
    console.log("data:", data);
  },[displayItems,data]);

 
  return ( 
  <div className="App">
     <header className="App-header">
       <img src={Logo} className="App-logo" alt="Logo" /> 
       <div className="Button">
       <Button onClick={() => fetchData("data")}>Taltech seltsi info</Button> 
       <Button onClick={() => fetchData("info")}>Taltech Seltsi uudised  </Button>
       </div>
       
       {displayItems && ( 
        <div className="data-container"> 
          {data.length > 0 ? ( 
            data.map(item => (
               <div key={item._id} className="data-item"> 
                <span className="data-id"></span><span className="data-text">{item.data ? item.data.replace(/^:/,'') : ""} </span>
                
               </div> 
             ))
          ) : ( 
          <p className="no-data">No data to display</p> 
        )} 
      </div> 
    )}
   </header> 
  </div> 
  ); 
}

export default App;
