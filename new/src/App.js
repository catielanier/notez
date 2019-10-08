import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Header from "./components/Header";
import Login from "./components/Login";
import "./App.css";

class App extends React.Component {
  state = {
    user: null,
    role: null
  };

  componentDidMount = async () => {
    const user = localStorage.getItem("notezId");
    this.setState({
      user
    });
    await this.checkRole();
  };

  setUser = user => {
    this.setState({
      user
    });
    this.checkRole();
  };

  checkRole = async () => {
    const { user } = this.state;
    if (user) {
      const userData = await axios.get(`/api/users/${user}`);
      const { role } = userData.data.data;
      this.setState({
        role
      });
    }
  };

  render() {
    return (
      <div className="App">
        <Router>
          <Header user={this.state.user} role={this.state.role} />
          <main>
            <Route
              path="/login"
              component={() => <Login setUser={this.setUser} />}
            />
          </main>
        </Router>
      </div>
    );
  }
}

export default App;
