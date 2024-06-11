import "./App.css";
import Button from "./components/Buttontest";
import Background from "./Images/Background.png";
import Logo from "./Images/Logo1.png";
import React, { useEffect, useState } from "react";
import axios from "axios";

console.log(Logo);
console.log(Background);

function App() {
  const handleClick = () => {
    alert("Button Clicked");
  };

    const [items, setItems] = useState([]);

    useEffect(() => {
      axios.get("/api/items")
      .then(response => setItems(response.data))
      .catch(error => console.error(error));
    }, []);
 
  return (
    <div className="App">
      <header className="App-header">
        <img src={Logo} className="App-logo" alt="Logo peaks siin olema" />

        <Button onClick={handleClick}>click me</Button>
      </header>
    </div>
  );
}

export default App;
