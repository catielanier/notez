import React, { useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { blue, orange } from "@material-ui/core/colors";
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
import Title from "./components/Title";
import "./App.css";
import MenuContextProvider from "./contexts/MenuContext";
import NoteContextProvider from "./contexts/NoteContext";
import GameContextProvider from "./contexts/GameContext";
import CharacterContextProvider from "./contexts/CharacterContext";
import FilterContextProvider from "./contexts/FilterContext";
import { UserContext } from "./contexts/UserContext";
import { LanguageContext } from "./contexts/LanguageContext";

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: orange
  }
});

export default function App() {
  const { user } = useContext(UserContext);
  const { language } = useContext(LanguageContext);
  return (
    <ThemeProvider theme={theme}>
      <Title />
      <div className={!user ? "App attract-main" : "App"}>
        <Router>
          <MenuContextProvider>
            <MobileMenu />
            <Header />
          </MenuContextProvider>
          <main>
            <GameContextProvider>
              <NoteContextProvider>
                {user ? (
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
                <Route path="/add-character" component={AddCharacter} />
                <Route path="/link-character" component={LinkCharacter} />
                <Route
                  path="/edit-character"
                  component={() => (
                    <EditCharacter user={user} language={language} />
                  )}
                />
              </CharacterContextProvider>
              <FilterContextProvider>
                <Route path="/add-filter" component={AddFilter} />
                <Route path="/link-filter" component={LinkFilter} />
                <Route
                  path="/edit-filter"
                  component={() => (
                    <EditFilter user={user} language={language} />
                  )}
                />
              </FilterContextProvider>
              <Route
                path="/edit-game"
                component={() => <EditGame user={user} language={language} />}
              />
            </GameContextProvider>
            <Route
              path="/user-settings"
              component={() => <UserSettings user={user} language={language} />}
            />
            <Route
              path="/profile"
              component={() => <Profile user={user} language={language} />}
            />
            <Route
              exact
              path="/forgot"
              component={() => <ForgotPassword language={language} />}
            />
            <Route
              path="/forgot/:key"
              component={() => <ResetPassword language={language} />}
            />
            <Route
              path="/verify/:key"
              component={() => <VerifyUser language={language} />}
            />
          </main>
        </Router>
      </div>
    </ThemeProvider>
  );
}
