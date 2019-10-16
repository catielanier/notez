import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { blue, orange } from "@material-ui/core/colors";
import axios from "axios";
import Header from "./components/Header";
import Login from "./components/Login";
import Signup from "./components/Signup";
import AddGame from "./components/AddGame";
import AddCharacter from "./components/AddCharacter";
import AddFilter from "./components/AddFilter";
import LinkCharacter from "./components/LinkCharacter";
import LinkFilter from "./components/LinkFilter";
import GameNotes from "./components/GameNotes";
import PlayerNotes from "./components/PlayerNotes";
import { removeToken } from "./services/tokenService";
import "./App.css";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange
  }
});

export default class App extends React.Component {
  state = {
    user: null,
    role: null
  };

  componentWillMount = () => {
    const user = localStorage.getItem("notezId");
    this.setState({
      user
    });
  };

  componentDidMount = async () => {
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

  logout = async e => {
    e.preventDefault();
    await removeToken();
    localStorage.removeItem("notezId");
    this.setState({
      user: null,
      role: null
    });
  };

  render() {
    return (
      <ThemeProvider theme={theme}>
        <div className="App">
          <Router>
            <Header
              user={this.state.user}
              role={this.state.role}
              logout={this.logout}
            />
            <main>
              {this.state.user && (
                <Route
                  exact
                  path="/"
                  component={() => <GameNotes user={this.state.user} />}
                />
              )}
              <Route
                exact
                path="/player"
                component={() => <PlayerNotes user={this.state.user} />}
              />
              <Route
                path="/login"
                component={() => <Login setUser={this.setUser} />}
              />
              <Route path="/signup" component={() => <Signup />} />
              <Route
                path="/add-game"
                component={() => <AddGame user={this.state.user} />}
              />
              <Route
                path="/add-character"
                component={() => <AddCharacter user={this.state.user} />}
              />
              <Route
                path="/add-filter"
                component={() => <AddFilter user={this.state.user} />}
              />
              <Route
                path="/link-character"
                component={() => <LinkCharacter user={this.state.user} />}
              />
              <Route
                path="/link-filter"
                component={() => <LinkFilter user={this.state.user} />}
              />
            </main>
          </Router>
        </div>
      </ThemeProvider>
    );
  }
}
