/** @format */

import React from "react";
import "./App.css";
import SendTags from "./pages/SendTags";
import { Route, Switch } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <header className="App-header" style={{ backgroundColor: "#153D5C" }}>
        <img
          alt="nr_beta_logo"
          src="https://noterouter-staging.firebaseapp.com/static/media/logo.b10c9223.png"
          style={{ width: "30%" }}
        />
        <main style={{ width: "30%" }}>
          <Switch>
            <Route exact path="/" component={SendTags} />
          </Switch>
        </main>
      </header>
    </div>
  );
}

export default App;
