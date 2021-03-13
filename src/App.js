import "./App.css";
import React from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import waldoImg from "./Images/level-1.jpg";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
    this.submitChoice = this.submitChoice.bind();
  }

  submitChoice(position) {
    console.log(position);
  }
  render() {
    return (
      <div className="App">
        <Header text="Waldo Game" />

        <Game submitChoice={this.submitChoice} image={waldoImg} />
      </div>
    );
  }
}

export default App;
