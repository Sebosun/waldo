import "./Header.css";
import React from "react";

class Header extends React.Component {
  render() {
    return <div className="header">{this.props.text}</div>;
  }
}

export default Header;
