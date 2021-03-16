import React, { useState, useEffect } from "react";
import "./Game.css";

export default function Game(props) {
  const [display, setDisplay] = useState(false);
  const [relSize, setRelSize] = useState([]);
  const [displayStyle, setDisplayStyle] = useState({
    position: "absolute",
    top: 0,
    left: 0,
  });

  // handles the dropdown menu, so that it appears under the clicked position
  function changeDisplay(event) {
    console.log(event.pageY, event.pageX);

    // gets the rel size of the image
    const rect = event.target.getBoundingClientRect();
    const x = event.clientX - rect.left; //x position within the element.
    const y = event.clientY - rect.top; //y position within the element.
    console.log(y, x);
    setRelSize([y, x]);
    setDisplayStyle({ ...displayStyle, top: event.pageY, left: event.pageX });
    setDisplay(!display);
  }

  // when the Game loads, starts the timer
  useEffect(() => {
    props.trackTime();
  }, []);

  return (
    <div className="gameContainer">
      {display ? (
        <div className="dropMenu" style={displayStyle}>
          <button
            onClick={(e) => {
              setDisplay(!display);
              props.submitChoice(relSize, "Waldo");
            }}
          >
            Waldo
          </button>
          <button
            onClick={(e) => {
              setDisplay(!display);
              props.submitChoice(relSize, "Odlaw");
            }}
          >
            Odlaw
          </button>
          <button
            onClick={(e) => {
              setDisplay(!display);
              props.submitChoice(relSize, "Wizard");
            }}
          >
            Wizard
          </button>
        </div>
      ) : null}
      <div onClick={(event) => changeDisplay(event)}>
        <img src={props.image} alt="waldo" />
      </div>
    </div>
  );
}
