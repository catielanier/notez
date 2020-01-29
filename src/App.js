import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { blue, orange } from "@material-ui/core/colors";
import axios from "axios";
import Helmet from "react-helmet";
import { title } from "./data/locales";
import localeSelect from "./services/localeSelect";
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
import UserSettings from "./components/UserSettings";
import Profile from "./components/Profile";
import EditCharacter from "./components/EditCharacter";
import EditGame from "./components/EditGame";
import EditFilter from "./components/EditFilter";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import VerifyUser from "./components/VerifyUser";
import "./App.css";
import UserContextProvider from "./contexts/UserContext";
import LanguageContextProvider from "./contexts/LanguageContext";
import MenuContextProvider from "./contexts/MenuContext";
import NoteContextProvider from "./contexts/NoteContext";
import GameContextProvider from "./contexts/GameContext";
import CharacterContextProvider from "./contexts/CharacterContext";

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
    language: ""
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
      <ThemeProvider theme={theme}>
        <Helmet>
          <title>{localeSelect(this.state.language, title)}</title>
        </Helmet>
        <LanguageContextProvider>
          <UserContextProvider>
            <div className={!this.state.user ? "App attract-main" : "App"}>
              <Router>
                <MenuContextProvider>
                  <MobileMenu />
                  <Header />
                </MenuContextProvider>
                <main>
                  <GameContextProvider>
                    <NoteContextProvider>
                      {this.state.user ? (
                        <Route exact path="/" component={GameNotes} />
                      ) : (
                        <Route exact path="/" component={Attract} />
                      )}
                      <Route path="/player" component={PlayerNotes} />
                    </NoteContextProvider>
                    <Route path="/login" component={Login} />
                    <Route path="/signup" component={Signup} />
                    <Route path="/add-game" component={AddGame} />
                    <CharacterContextProvider>
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
                        path="/link-character"
                        component={() => (
                          <LinkCharacter
                            user={this.state.user}
                            language={this.state.language}
                          />
                        )}
                      />
                      <Route
                        path="/edit-character"
                        component={() => (
                          <EditCharacter
                            user={this.state.user}
                            language={this.state.language}
                          />
                        )}
                      />
                    </CharacterContextProvider>
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
                      path="/link-filter"
                      component={() => (
                        <LinkFilter
                          user={this.state.user}
                          language={this.state.language}
                        />
                      )}
                    />
                    <Route
                      path="/edit-filter"
                      component={() => (
                        <EditFilter
                          user={this.state.user}
                          language={this.state.language}
                        />
                      )}
                    />
                    <Route
                      path="/edit-game"
                      component={() => (
                        <EditGame
                          user={this.state.user}
                          language={this.state.language}
                        />
                      )}
                    />
                  </GameContextProvider>
                  <Route
                    path="/user-settings"
                    component={() => (
                      <UserSettings
                        user={this.state.user}
                        language={this.state.language}
                      />
                    )}
                  />
                  <Route
                    path="/profile"
                    component={() => (
                      <Profile
                        user={this.state.user}
                        language={this.state.language}
                      />
                    )}
                  />
                  <Route
                    exact
                    path="/forgot"
                    component={() => (
                      <ForgotPassword language={this.state.language} />
                    )}
                  />
                  <Route
                    path="/forgot/:key"
                    component={() => (
                      <ResetPassword language={this.state.language} />
                    )}
                  />
                  <Route
                    path="/verify/:key"
                    component={() => (
                      <VerifyUser language={this.state.language} />
                    )}
                  />
                </main>
              </Router>
            </div>
          </UserContextProvider>
        </LanguageContextProvider>
      </ThemeProvider>
    );
  }
}
