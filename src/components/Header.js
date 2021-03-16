import "./Header.css";
import React from "react";

class Header extends React.Component {
  render() {
    return (
      <div className="header">
        <div>{this.props.text}</div>

        {this.props.found ? (
          <div className="characters">
            {this.props.found.waldo ? (
              <div style={{ textDecoration: "line-through" }}>Waldo</div>
            ) : (
              <div>Waldo</div>
            )}
            {this.props.found.odlaw ? (
              <div style={{ textDecoration: "line-through" }}>Odlaw</div>
            ) : (
              <div>Odlaw</div>
            )}
            {this.props.found.wizard ? (
              <div style={{ textDecoration: "line-through" }}>Wizard</div>
            ) : (
              <div>Wizard</div>
            )}
          </div>
        ) : null}
      </div>
    );
  }
}

export default Header;
