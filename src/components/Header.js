import "./Header.css";
import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div>{this.props.text}</div>
        <div>
          {this.props.found.waldo ? (
            <div style={{ textDecoration: "line-through" }}>Waldo</div>
          ) : (
            <div>Waldo</div>
          )}
        </div>
        <div>
          {this.props.found.odlaw ? (
            <div style={{ textDecoration: "line-through" }}>Odlaw</div>
          ) : (
            <div>Odlaw</div>
          )}
        </div>
        <div>
          {this.props.found.wizard ? (
            <div style={{ textDecoration: "line-through" }}>Wizard</div>
          ) : (
            <div>Wizard</div>
          )}
        </div>
      </div>
    );
  }
}

export default Header;
