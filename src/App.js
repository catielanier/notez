import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { blue, orange } from "@material-ui/core/colors";
import axios from "axios";
import Helmet from "react-helmet";
import Particles from "react-particles-js";
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
import Attract from "./components/Attract";
import MobileMenu from "./components/MobileMenu";
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
    role: null,
    language: "",
    menu: false
  };

  componentWillMount = () => {
    const user = localStorage.getItem("notezId");
    this.setState({
      user
    });
    const locale = navigator.language;
    const index = locale.indexOf("zh");
    if (index !== 0) {
      const language = locale.split(/[-_]/)[0];
      this.setState({
        language
      });
    } else {
      const language = locale;
      this.setState({
        language
      });
    }
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

  showMenu = () => {
    const menu = !this.state.menu;
    this.setState({
      menu
    });
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
        <Helmet>
          <title>
            {this.state.language === "ja"
              ? "ノートZ"
              : this.state.language === "ko"
              ? "노트Z"
              : this.state.language === "zh-CN"
              ? "笔记Z"
              : this.state.language === "zh-TW" ||
                this.state.language === "zh-HK"
              ? "筆記Z"
              : "NoteZ"}
          </title>
        </Helmet>
        <div className={!this.state.user ? "App attract-main" : "App"}>
          <Router>
            <MobileMenu
              user={this.state.user}
              role={this.state.role}
              language={this.state.language}
              logout={this.logout}
              showMenu={this.showMenu}
              menu={this.state.menu}
            />
            <Header
              user={this.state.user}
              role={this.state.role}
              language={this.state.language}
              logout={this.logout}
              showMenu={this.showMenu}
            />
            {!this.state.user && (
              <Particles
                params={{
                  particles: {
                    number: {
                      value: 90
                    },
                    size: {
                      value: 5
                    }
                  },
                  interactivity: {
                    events: {
                      onhover: {
                        enable: true,
                        mode: "repulse"
                      }
                    }
                  }
                }}
                className="particle"
              />
            )}
            <main>
              {this.state.user ? (
                <Route
                  exact
                  path="/"
                  component={() => (
                    <GameNotes
                      user={this.state.user}
                      language={this.state.language}
                    />
                  )}
                />
              ) : (
                <Route exact path="/" component={Attract} />
              )}
              <Route
                exact
                path="/player"
                component={() => (
                  <PlayerNotes
                    user={this.state.user}
                    language={this.state.language}
                  />
                )}
              />
              <Route
                path="/login"
                component={() => (
                  <Login
                    setUser={this.setUser}
                    language={this.state.language}
                  />
                )}
              />
              <Route
                path="/signup"
                component={() => <Signup language={this.state.language} />}
              />
              <Route
                path="/add-game"
                component={() => (
                  <AddGame
                    user={this.state.user}
                    language={this.state.language}
                  />
                )}
              />
              <Route
                path="/add-character"
                component={() => (
                  <AddCharacter
                    user={this.state.user}
                    language={this.state.language}
                  />
                )}
              />
              <Route
                path="/add-filter"
                component={() => (
                  <AddFilter
                    user={this.state.user}
                    language={this.state.language}
                  />
                )}
              />
              <Route
                path="/link-character"
                component={() => (
                  <LinkCharacter
                    user={this.state.user}
                    language={this.state.language}
                  />
                )}
              />
              <Route
                path="/link-filter"
                component={() => (
                  <LinkFilter
                    user={this.state.user}
                    language={this.state.language}
                  />
                )}
              />
            </main>
          </Router>
        </div>
      </ThemeProvider>
    );
  }
}
