import React, { useState } from "react";
import "./Won.css";

export default function Won(props) {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function changeName(event) {
    const { name, value } = event.target;
    setName(value);
  }

  return (
    <div className="winningScreen">
      {submitted ? (
        <div className="wonContainer">
          <div>Your score has been submitted!</div>
          <button
            onClick={() => {
              props.stopGame();
              props.showLeaderboards();
            }}
          >
            Leaderboards
          </button>
        </div>
      ) : (
        <div className="wonContainer">
          <div>You won, congrats!</div>
          <div>You have finished in {props.time} seconds !</div>
          <form
            onSubmit={(e) => {
              setSubmitted(true);
              return props.addToLeaderboards(e, name);
            }}
          >
            <label>
              Submit your score!
              <br />
              <input
                placeholder="Enter your nickname!"
                value={name}
                name="name"
                type="text"
                onChange={changeName}
              />
              <br />
              <button> Submit! </button>
            </label>
          </form>{" "}
        </div>
      )}
    </div>
  );
}
