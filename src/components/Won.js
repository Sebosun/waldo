import React, { useState } from "react";

export default function Won(props) {
  const [name, setName] = useState("");

  function changeInput(event) {
    const { name, value } = event.target;
    setName(value);
  }

  return (
    <div>
      <div>You won, congrats!</div>
      <form>
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
      </form>
    </div>
  );
}
