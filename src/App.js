import "./App.css";
import Game from "./components/Game";

function App() {
  function returnMousePosition(e) {
    e.preventDefault();
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top; //y position within the element.
    console.log("Left? : " + x + " ; Top? : " + y + ".");
  }

  return (
    <div onClick={returnMousePosition} className="App">
      <Game text="Test" />
    </div>
  );
}

export default App;
