import "./App.css";
import React from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import waldoImg from "./Images/level-1.jpg";
import checkWaldo from "./functions/checkWaldo";
import calcDisplayChanges from "./functions/calcDisplayChanges";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      waldoPos: [392, 545],
      yellowPos: [382, 248.5],
      wizardPos: [386, 649],
    };
    this.submitChoice = this.submitChoice.bind(this);
  }

  submitChoice(position, character) {
    // const change = calcDisplayChanges();
    if (character == "Waldo") {
      console.log(checkWaldo(position, this.state.waldoPos, 40));
    } else if (character == "Yellow") {
      console.log(checkWaldo(position, this.state.yellowPos, 40));
    } else if (character == "Wizard") {
      console.log(checkWaldo(position, this.state.wizardPos, 40));
    }
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
