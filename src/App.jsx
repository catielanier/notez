import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import CircularProgress from "@mui/material/CircularProgress";

import Attract from "./components/Attract";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import VerifyUser from "./components/VerifyUser";
import GameNotes from "./components/GameNotes";
import PlayerNotes from "./components/PlayerNotes";
import UserSettings from "./components/UserSettings";
import Profile from "./components/Profile";
import Title from "./components/Title";
import Header from "./components/Header";
import MobileMenu from "./components/MobileMenu";

import CountryContextProvider from "./contexts/CountryContext";
import MenuContextProvider from "./contexts/MenuContext";
import useAuth from "./hooks/useAuth";

import neonColorsDark from "./themes/neonColorsDark";
import neonColorsLight from "./themes/neonColorsLight";
import "./App.css";

function ProtectedRoutes({ toggleDarkTheme }) {
  return (
    <Routes>
      <Route path="/" element={<GameNotes />} />
      <Route path="/player" element={<PlayerNotes />} />
      <Route path="/user-settings" element={<UserSettings />} />
      <Route
        path="/profile"
        element={<Profile toggleDarkTheme={toggleDarkTheme} />}
      />
    </Routes>
  );
}

function PublicRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Attract />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/forgot/:key" element={<ResetPassword />} />
      <Route path="/verify/:key" element={<VerifyUser />} />
    </Routes>
  );
}

export default function App() {
  const { user, userLoading } = useAuth();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const toggleDarkTheme = () => setIsDarkTheme((prev) => !prev);
  const theme = isDarkTheme ? neonColorsDark : neonColorsLight;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <CssBaseline />

        <Title />

        <div className={user ? "App" : "App attract-main"}>
          <CountryContextProvider>
            <MenuContextProvider>
              <Router>
                <MobileMenu />
                <Header />
                <main>
                  {userLoading ? (
                    <CircularProgress />
                  ) : user ? (
                    <ProtectedRoutes toggleDarkTheme={toggleDarkTheme} />
                  ) : (
                    <PublicRoutes />
                  )}
                </main>
              </Router>
            </MenuContextProvider>
          </CountryContextProvider>
        </div>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
