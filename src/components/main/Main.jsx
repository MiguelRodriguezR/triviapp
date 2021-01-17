import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import tokenAuth from "../../config/tokenAuth";
import Intro from "../sections/intro";
import Game from "../sections/game";
import Scores from "../sections/scores";
import GameState from "../../context/game/gameState";

const token = localStorage.getItem("token");

if (token) {
  tokenAuth(token);
}

const Main = () => {
  return (
    <GameState>
      <Router>
        <Switch>
          <Route exact path="/" component={Intro}></Route>
          <Route exact path="/game" component={Game}></Route>
          <Route exact path="/scores" component={Scores}></Route>
        </Switch>
      </Router>
    </GameState>
  );
};

export default Main;
