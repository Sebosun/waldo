import "./App.css";
import React from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import waldoImg from "./Images/level-1.jpg";

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Header text="Test" />
        <Game image={waldoImg} />
      </div>
    );
  }
}

export default App;
