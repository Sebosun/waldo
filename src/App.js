import "./App.css";
import React from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import waldoImg from "./Images/level-1.jpg";

class App extends React.Component {
  constructor() {
    super();
    this.state = {};
  }

  render() {
    return (
      <div className="App">
        <Header text="Waldo Game" />

        <Game
          showMenu={this.showMenu}
          charMenu={this.charMenu}
          displayMenu={this.state.showMenu}
          image={waldoImg}
        />
      </div>
    );
  }
}

export default App;
