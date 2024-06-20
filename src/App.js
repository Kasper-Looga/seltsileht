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
  
  

  
  const fetchData = async (input_button) => {
    try{
      console.log("fetching data...");
      const response = await axios.get("http://localhost:5000/Data");
      console.log("fetched data",response.data);
      console.log("field", input_button )

      if(input_button  === "data"){
        setData(response.data.filter(item => item.data));
        console.log("this is (response.data[])", response.data["data"])
      }else if (input_button  ==="info"){
        setData(response.data.filter(item => item.info));
        console.log("this is (response.data[]) ", response.data["info"])
      }



      setDisplayItems(displayItems === input_button ? "" : input_button );
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
       <div className="ButtonContainer top">
       <Button onClick={() => fetchData("data")}>Taltech seltsi info</Button> 
       </div>

       <div className="ButtonContainer bottom">
       <Button onClick={() => fetchData("info")}>Taltech Seltsi uudised  </Button>
       </div>
       
       {displayItems && ( 
        <div className="data-container">
          
          {data && data.length > 0 ? ( 
            data.map(item => (
               <div key={item._id} className="data-item"> 
                <span className="item-id"></span>
                <span className="data-text"> 
                  {displayItems === "data" ? item.data : item.info}
                </span>
                
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
