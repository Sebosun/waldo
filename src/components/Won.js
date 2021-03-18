import React, { useState } from "react";

export default function Won(props) {
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);

  function changeInput(event) {
    const { name, value } = event.target;
    setName(value);
  }

  return (
    <div>
      {submitted ? (
        <div>Your score has been submitted!</div>
      ) : (
        <div>
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
                onChange={changeInput}
              />
              <button> Submit! </button>
            </label>
          </form>{" "}
        </div>
      )}
    </div>
  );
}
