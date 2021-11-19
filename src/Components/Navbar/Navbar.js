import React, { Component } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

export default class Navbar extends Component {
  render() {
    return (
      <div className="navbar ">
        <h1>
          <Link to="/">Moviesflix</Link>
        </h1>
        <h3>
          <Link to="/favourite">Favourite</Link>
        </h3>
      </div>
    );
  }
}
