import "./App.css";

import Button from "./components/Buttontest";
import Background from "./Images/Background.png";
import Logo from "./Images/Logo1.png";
import LoginBackground from "./Images/LoginBackground.png";
import React, { useEffect, useState } from "react";
import axios from "axios";
import * as Components from "./components/Components";

console.log(Logo);
console.log(Background);
console.log(LoginBackground);

function App() {
  const [data, setData] = useState([]);
  const [displayItems, setDisplayItems] = useState("");
  const [formType, setFormType] = useState("login");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [signIn, toggle] = React.useState(true);
  const toggleForm = () => setIsFormOpen(!isFormOpen);

  const switchToLogin = () => {
    setFormType("login");
  };
  const switchToRegister = () => setFormType("register");

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
          <Button onClick={toggleForm}>Login</Button>
        </div>

        {isFormOpen && (
          <Components.Container>
            <Components.SignUpContainer signingIn={signIn}>
              <Components.Form>
                <Components.Title>Create Account</Components.Title>
                <Components.Input type="text" placeholder="Name" />
                <Components.Input type="email" placeholder="Email" />
                <Components.Input type="password" placeholder="Password" />
                <Components.Button>Sign Up</Components.Button>
              </Components.Form>
            </Components.SignUpContainer>
            <Components.SignInContainer signingIn={signIn}>
              <Components.Form>
                <Components.Title>Sign in</Components.Title>
                <Components.Input type="email" placeholder="Email" />
                <Components.Input type="password" placeholder="Password" />
                <Components.Anchor href="#">
                  Forgot your password?
                </Components.Anchor>
                <Components.Button>Sign In</Components.Button>
              </Components.Form>
            </Components.SignInContainer>
            <Components.OverlayContainer signingIn={signIn}>
              <Components.Overlay signingIn={signIn}>
                <Components.LeftOverlayPanel signingIn={signIn}>
                  <Components.Title>Welcome Back!</Components.Title>
                  <Components.Paragraph>
                    To keep connected with us please login with your personal
                    info
                  </Components.Paragraph>
                  <Components.GhostButton onClick={() => toggle(true)}>
                    Sign In
                  </Components.GhostButton>
                </Components.LeftOverlayPanel>
                <Components.RightOverlayPanel signingIn={signIn}>
                  <Components.Title>Hello, Friend!</Components.Title>
                  <Components.Paragraph>
                    Enter your personal details and start journey with us
                  </Components.Paragraph>
                  <Components.GhostButton onClick={() => toggle(false)}>
                    Sign Up
                  </Components.GhostButton>
                </Components.RightOverlayPanel>
              </Components.Overlay>
            </Components.OverlayContainer>
          </Components.Container>
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
const LoginForm = () => (
  <div>
    <h2>Login Form</h2>
    {/* Add your login form fields here */}
  </div>
);

const RegisterForm = () => (
  <div>
    <h2>Register Form</h2>
    {/* Add your register form fields here */}
  </div>
);

export default App;
