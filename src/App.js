import "./App.css";
import React from "react";
import Header from "./components/Header";
import Game from "./components/Game";
import Won from "./components/Won";
import Leaderboads from "./components/Leaderboards";
import waldoImg from "./Images/level-1.jpg";
import checkWaldo from "./functions/checkWaldo";
import calcDisplayChanges from "./functions/calcDisplayChanges";

import { firebase } from "@firebase/app";
import Leaderboards from "./components/Leaderboards";

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
      showLeaderboards: false,
      userId: null,
      time: null,
    };
    this.submitChoice = this.submitChoice.bind(this);
    this.trackTime = this.trackTime.bind(this);
    this.checkWin = this.checkWin.bind(this);
    this.calcTime = this.calcTime.bind(this);
    this.addToLeaderboards = this.addToLeaderboards.bind(this);
    this.showLeaderboards = this.showLeaderboards.bind(this);
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

  // get the waldo positions from the server on component load
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
  // on update check if the winning condition has been met
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
  //calculates how much time passed since the start of the game till it was completed
  calcTime() {
    firebase
      .firestore()
      .collection("time-elapsed")
      .doc(`${this.state.userId}`)
      .get()
      .then((doc) => {
        // This is messy, but works.
        console.log(doc.data().timestampEnd);
        const secondsStarted = doc.data().timestampStart.seconds;
        const startDate = new Date(secondsStarted * 1000);
        const secondsEnded = doc.data().timestampEnd.seconds;
        const endDate = new Date(secondsEnded * 1000);
        const timeElapsed = endDate - startDate;

        const microSecStart = doc.data().timestampStart.nanoseconds;
        const microSecEnd = doc.data().timestampEnd.nanoseconds;
        const microElapsed = (microSecEnd - microSecStart) / 1000000000;

        let realTimePassed = timeElapsed / 1000 + microElapsed;
        realTimePassed = Math.floor(realTimePassed * 100) / 100;
        this.setState({ time: realTimePassed });
      })
      .catch((error) => {
        console.log("Error getting time", error);
      });
  }
  // runs through an object, creates an array from it and checks
  // if every arr item is true
  checkWin = (obj) => {
    let arr = [];
    for (const prop in obj) {
      arr.push(obj[prop]);
    }
    return arr.every((value) => value);
  };

  // DONE-  TODO Pop-up prompt after the game has been won - > upload score to the database
  // TODO Leaderboards

  addToLeaderboards(event, name) {
    event.preventDefault();
    const leaderboards = firebase.firestore().collection("leaderboards");
    leaderboards.add({
      userName: name,
      time: this.state.time,
      userId: this.state.userId,
    });
  }

  showLeaderboards() {
    this.setState({ showLeaderboards: !this.state.showLeaderboards });
  }

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
            {this.state.won ? (
              <Won
                time={this.state.time}
                addToLeaderboards={this.addToLeaderboards}
              />
            ) : null}
          </div>
        ) : !this.state.showLeaderboards ? (
          <div>
            <Header text="Waldo Game" />
            {/* #TODO ? make a separte component out of this? */}
            <div className="mainMenu">
              <button
                onClick={() =>
                  this.setState({
                    gameStarted: !this.state.gameStarted,
                  })
                }
              >
                Start Game{" "}
              </button>
              <button onClick={() => this.showLeaderboards()}>
                {" "}
                Show leaderboards{" "}
              </button>
            </div>
          </div>
        ) : (
          <div>
            {" "}
            <Header text="Leaderboards" />
            <Leaderboards />
          </div>
        )}
      </div>
    );
  }
}

export default App;
