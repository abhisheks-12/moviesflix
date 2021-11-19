import React, { Component } from "react";
import Favourite from "./Components/Favourite/Favourite";
import Movies from "./Components/Movies/Movies";
import Navbar from "./Components/Navbar/Navbar";
import Poster from "./Components/Poster/Poster";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              <Poster />
              <Movies />
            </Route>

            <Route path="/favourite">
              <Favourite />
            </Route>
          </Switch>
        </Router>
      </div>
    );
  }
}
