import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import "./App.css";

class App extends React.Component {
  state = {
    user: null,
    role: null
  };
  changeState = e => {
    const { name, value } = e.target;
    this.setState({
      [name]: value
    });
  };
  render() {
    return (
      <div className="App">
        <Router>
          <Header user={this.state.user} role={this.state.role} />
          <Route path="/login" component={() => <Login />} />
        </Router>
      </div>
    );
  }
}

export default App;
