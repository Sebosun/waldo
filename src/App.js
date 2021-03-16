import "./App.css";
import React from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import Won from "./components/Won";
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
      won: false,
      gameStarted: false,
      userId: null,
    };
    this.submitChoice = this.submitChoice.bind(this);
    this.trackTime = this.trackTime.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.calcTime = this.calcTime.bind(this);
  }
  //grabs the character positions from the firebase

  // adds a new "user" with unique id to firebase
  // saves the id to state, so later we can calculate their time
  trackTime = async () => {
    const newUserClick = await firebase
      .firestore()
      .collection("time-elapsed")
      .add({
        userName: "",
        timestampStart: firebase.firestore.FieldValue.serverTimestamp(),
        timestampEnd: null,
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
    // this.trackTime();
  };

  componentDidUpdate() {
    // second statement needs to be added to avoid infinite regress
    if (this.checkWin(this.state.found) && this.state.won !== true) {
      this.setState({ won: true });
      firebase
        .firestore()
        .collection("time-elapsed")
        .doc(this.state.userId)
        .update({
          timestampEnd: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => this.calcTime());
    }
    // this.calcTime();
  }

  calcTime() {
    firebase
      .firestore()
      .collection("time-elapsed")
      .doc(`${this.state.userId}`)
      .get()
      .then((doc) => {
        console.log(doc.data().timestampEnd);
        const secondsStarted = doc.data().timestampStart.seconds;
        const startDate = new Date(secondsStarted * 1000);
        const secondsEnded = doc.data().timestampEnd.seconds;
        const endDate = new Date(secondsEnded * 1000);
        console.log(endDate - startDate);
      })
      .catch((error) => {
        console.log("Error getting time");
      });
  }

  //checks if game has been won
  checkWin = (obj) => {
    let arr = [];
    for (const prop in obj) {
      arr.push(obj[prop]);
    }
    return arr.every((value) => value);
  };

  // TODO Pop-up prompt after the game has been won - > upload score to the database
  // TODO Leaderboards
  render() {
    return (
      <div className="App">
        {this.state.gameStarted ? (
          <div>
            <Header found={this.state.found} text="Waldo Game" />
            <Game
              trackTime={this.trackTime}
              submitChoice={this.submitChoice}
              image={waldoImg}
            />
            {this.state.won ? <Won /> : null}
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
