import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { About } from "./components/About";
import { Home } from "./components/Home";
import { Details } from "./components/Details";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="container p-4">
        <Switch>
          <Route path="/client" component={About} />
 

          <Route path="/" component={Home} />
          <Route path="/product" component={Details} />

        </Switch>
      </div>
    </Router>
  );
}

export default App;
