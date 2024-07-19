import "./App.css";
import Button from "./components/Buttontest";
import Background from "./Images/Background.png";
import Logo from "./Images/Logo1.png";
import LoginBackground from "./Images/LoginBackground.png";
import React, { useEffect, useState } from "react";
import axios from "axios";

console.log(Logo);
console.log(Background);
console.log(LoginBackground);

function App() {
  const [data, setData] = useState([]);
  const [displayItems, setDisplayItems] = useState("");
  const [showForm, setShowForm] = useState(false);

  const fetchData = async (input_button) => {
    try {
      console.log("fetching data...");
      const response = await axios.get("http://localhost:5000/Data");
      console.log("fetched data", response.data);
      console.log("field", input_button);

      if (input_button === "data") {
        setData(response.data.filter((item) => item.data));
        console.log("this is (response.data[])", response.data["data"]);
      } else if (input_button === "info") {
        setData(response.data.filter((item) => item.info));
        console.log("this is (response.data[]) ", response.data["info"]);
      }

      setDisplayItems(displayItems === input_button ? "" : input_button);
      console.log("display items", displayItems);
    } catch (error) {
      console.error("Error Fetching data", error);
    }
  };

  useEffect(() => {
    console.log("displayItems:", displayItems);
    console.log("data:", data);
  }, [displayItems, data]);

  const handleClickOutside = (event) => {
    if (event.target === document.getElementById("id_01")) {
      setShowForm(false);
    }
  };

  useEffect(() => {
    window.addEventListener("click", handleClickOutside);
    return () => {
      window.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={Logo} className="App-logo" alt="Logo" />
        <div className="ButtonContainer top">
          <Button onClick={() => fetchData("data")}>Taltech seltsi info</Button>
        </div>

        <div className="ButtonContainer bottom">
          <Button onClick={() => fetchData("info")}>
            Taltech Seltsi uudised
          </Button>
        </div>
        <div className="ButtonContainer registerbutton">
          <Button onClick={() => setShowForm(true)}>Login</Button>
        </div>

        {showForm && (
          <div id="id_01">
            <div className="button-box">
              <div id="btncooler"></div>
              <button type="button" className="toggle-btn">
                Log in
              </button>
              <button type="button" className="toggle-btn" onclick="register()">
                Register
              </button>

              <div>
                <form id="login" className="input-group">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="User id"
                    required
                  ></input>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Enter Password"
                    required
                  ></input>
                  <input type="checkbox" className="checkbox"></input>
                  <span>Remember Password</span>
                  <button type="submit" className="submit-btn">
                    Log in
                  </button>
                </form>
                <form id="register" className="input-group">
                  <input
                    type="text"
                    className="input-field"
                    placeholder="User id"
                    required
                  ></input>

                  <input
                    type="text"
                    className="input-field"
                    placeholder="Email"
                    required
                  ></input>
                  <input
                    type="text"
                    className="input-field"
                    placeholder="Enter Password"
                    required
                  ></input>
                  <input type="checkbox" className="checkbox"></input>
                  <span>Remember Password</span>
                  <button type="submit" className="submit-btn">
                    Register
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {displayItems && (
          <div className="data-container">
            {data && data.length > 0 ? (
              data.map((item) => (
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
