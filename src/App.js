import "./App.css";
import Button from "./components/Buttontest";
import Background from "./Images/Background.png";
import Logo from "./Images/Logo1.png";

console.log(Logo);
console.log(Background);

function App() {
  const handleClick = () => {
    alert("Button Clicked");
  };

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
