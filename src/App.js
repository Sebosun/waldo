import "./App.css";
import React from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import waldoImg from "./Images/level-1.jpg";
import checkWaldo from "./functions/checkWaldo";
import calcDisplayChanges from "./functions/calcDisplayChanges";

import { firebase } from "@firebase/app";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      positions: [],
      found: {
        waldo: false,
        odlaw: false,
        wizard: false,
      },
    };
    this.submitChoice = this.submitChoice.bind(this);
  }

  componentDidMount = () => {
    firebase
      .firestore()
      .collection("waldo")
      .onSnapshot((serverUpdate) => {
        const positions = serverUpdate.docs.map((_doc) => {
          const data = _doc.data();
          console.log(data);
          return data;
        });
        this.setState({ positions: positions });
        console.log(this.state.positions);
      });
  };

  submitChoice(position, character) {
    // const change = calcDisplayChanges();
    if (character === "Waldo") {
      if (checkWaldo(position, this.state.positions[0].waldo, 40)) {
        this.setState((prevState) => {
          return { found: { ...prevState.found, waldo: true } };
        });
        console.log(this.state);
      }
    } else if (character === "Odlaw") {
      if (checkWaldo(position, this.state.positions[0].odlaw, 40)) {
        this.setState((prevState) => {
          return { found: { ...prevState.found, odlaw: true } };
        });
      }
    } else if (character === "Wizard") {
      if (checkWaldo(position, this.state.positions[0].wizard, 40)) {
        this.setState((prevState) => {
          return { found: { ...prevState.found, wizard: true } };
        });
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Header found={this.state.found} text="Waldo Game" />
        <Game submitChoice={this.submitChoice} image={waldoImg} />
      </div>
    );
  }
}

export default App;
