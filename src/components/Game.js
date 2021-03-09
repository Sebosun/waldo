import React from "react";
import "./Game.css";

export default function Game(props) {
  return (
    <div className="gameContainer">
      <img src={props.image} alt="waldo" />
    </div>
  );
}
