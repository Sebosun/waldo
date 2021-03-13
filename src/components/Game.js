import React, { useState } from "react";
import "./Game.css";

export default function Game(props) {
  const [display, setDisplay] = useState(false);
  const [displayStyle, setDisplayStyle] = useState({
    position: "absolute",
    top: 0,
    left: 0,
  });

  function changeDisplay(event) {
    console.log(event);
    setDisplayStyle({ ...displayStyle, top: event.pageY, left: event.pageX });
    console.log(displayStyle);
    setDisplay(!display);
  }

  return (
    <div onClick={(event) => changeDisplay(event)} className="gameContainer">
      {display ? (
        <div className="dropMenu" style={displayStyle}>
          <button>Waldo</button>
          <button>Baldo</button>
          <button>Wizard</button>
        </div>
      ) : null}
      <div>
        <img src={props.image} alt="waldo" />
      </div>
    </div>
  );
}
