// src/App.js
import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// MUI 5 imports
import { StyledEngineProvider, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

// Components
import Attract from "./components/Attract";
import ForgotPassword from "./components/ForgotPassword";
import GameNotes from "./components/GameNotes";
import Header from "./components/Header";
import Invite from "./components/Invite";
import InviteSignup from "./components/InviteSignup";
import Login from "./components/Login";
import MobileMenu from "./components/MobileMenu";
import PlayerNotes from "./components/PlayerNotes";
import Profile from "./components/Profile";
import ResetPassword from "./components/ResetPassword";
import Signup from "./components/Signup";
import Title from "./components/Title";
import UserSettings from "./components/UserSettings";
import VerifyUser from "./components/VerifyUser";

// Contexts
import CountryContextProvider from "./contexts/CountryContext";
import MenuContextProvider from "./contexts/MenuContext";
import NoteContextProvider from "./contexts/NoteContext";
import { UserContext } from "./contexts/UserContext";

// Styles
import "./App.css";

// Your custom MUI theme objects (built via createTheme from @mui/material/styles)
import neonColorsDark from "./themes/neonColorsDark";
import neonColorsLight from "./themes/neonColorsLight";

function Contexts({ children }) {
  return <NoteContextProvider>{children}</NoteContextProvider>;
}

function ProtectedRoutes({ toggleDarkTheme }) {
  return (
    <Routes>
      {/* Protected */}
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
      {/* Public */}
      <Route path="/" element={<Attract />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot" element={<ForgotPassword />} />
      <Route path="/forgot/:key" element={<ResetPassword />} />
      <Route path="/verify/:key" element={<VerifyUser />} />
      <Route path="/invite" element={<Invite />} />
      <Route path="/invite/:id" element={<InviteSignup />} />
    </Routes>
  );
}

export default function App() {
  const { user } = useContext(UserContext);
  const [isDarkTheme, setIsDarkTheme] = useState(true);
  const toggleDarkTheme = () => setIsDarkTheme((prev) => !prev);

  const theme = isDarkTheme ? neonColorsDark : neonColorsLight;

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        {/* Normalize & reset browser CSS */}
        <CssBaseline />

        <Title />
        <div className={!user ? "App attract-main" : "App"}>
          <CountryContextProvider>
            <MenuContextProvider>
              <Router>
                <MobileMenu />
                <Header />
                <main>
                  {user ? (
                    <Contexts>
                      <ProtectedRoutes toggleDarkTheme={toggleDarkTheme} />
                    </Contexts>
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
