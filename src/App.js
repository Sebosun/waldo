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
      gameStarted: false,
      positions: [],
      found: {
        waldo: false,
        odlaw: false,
        wizard: false,
      },
      userId: null,
    };
    this.submitChoice = this.submitChoice.bind(this);
    this.trackTime = this.trackTime.bind(this);
  }
  //grabs the character positions from the firebase

  componentDidMount = () => {
    firebase
      .firestore()
      .collection("waldo")
      .onSnapshot((serverUpdate) => {
        const positions = serverUpdate.docs.map((_doc) => {
          const data = _doc.data();
          return data;
        });
        this.setState({ positions: positions });
      });
    this.trackTime();
  };

  // adds a new "user" with unique id to firebase
  // saves the id to state, so later we can calculate their time
  trackTime = async () => {
    const newUserClick = await firebase
      .firestore()
      .collection("time-elapsed")
      .add({
        userName: "",
        timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      });
    this.setState({ userId: newUserClick.id });
  };

  // verifies whether the position has been 'hit'
  submitChoice(position, character) {
    if (character === "Waldo") {
      if (checkWaldo(position, this.state.positions[0].waldo, 40)) {
        this.setState((prevState) => {
          return { found: { ...prevState.found, waldo: true } };
        });
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
        {this.state.gameStarted ? (
          <div>
            <Header found={this.state.found} text="Waldo Game" />
            <Game submitChoice={this.submitChoice} image={waldoImg} />
          </div>
        ) : (
          <div>
            <Header text="Waldo Game" />
            {/* #TODO ? make a separte component out of this? */}
            <div>
              <button
                onClick={() =>
                  this.setState({
                    gameStarted: !this.state.gameStarted,
                  })
                }
              >
                Start Game{" "}
              </button>
              <button> Show leaderboards </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;
