import React, { useContext, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";

// Components
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
import Invite from "./components/Invite";
import InviteSignup from "./components/InviteSignup";

// Contexts
import MenuContextProvider from "./contexts/MenuContext";
import NoteContextProvider from "./contexts/NoteContext";
import GameContextProvider from "./contexts/GameContext";
import CharacterContextProvider from "./contexts/CharacterContext";
import FilterContextProvider from "./contexts/FilterContext";
import CountryContextProvider from "./contexts/CountryContext";
import { UserContext } from "./contexts/UserContext";

// Styles
import "./App.css";
import neonColorsDark from "./themes/neonColorsDark";
import neonColorsLight from "./themes/neonColorsLight";

export default function App() {
	const { user } = useContext(UserContext);
	const [isDarkTheme, setIsDarkTheme] = useState(true);
	const toggleDarkTheme = () => setIsDarkTheme((prev) => !prev);

	return (
		<ThemeProvider theme={isDarkTheme ? neonColorsDark : neonColorsLight}>
			<Title />
			<div className={!user ? "App attract-main" : "App"}>
				<CountryContextProvider>
					<MenuContextProvider>
						<Router>
							<MobileMenu />
							<Header />
							<main>
								{user ? (
									<GameContextProvider>
										<NoteContextProvider>
											<CharacterContextProvider>
												<FilterContextProvider>
													<Routes>
														{/* Protected Routes */}
														<Route path="/" element={<GameNotes />} />
														<Route path="/player" element={<PlayerNotes />} />
														<Route path="/add-game" element={<AddGame />} />
														<Route path="/edit-game" element={<EditGame />} />
														<Route path="/add-character" element={<AddCharacter />} />
														<Route path="/link-character" element={<LinkCharacter />} />
														<Route path="/edit-character" element={<EditCharacter />} />
														<Route path="/add-filter" element={<AddFilter />} />
														<Route path="/link-filter" element={<LinkFilter />} />
														<Route path="/edit-filter" element={<EditFilter />} />
														<Route path="/user-settings" element={<UserSettings />} />
														<Route path="/profile" element={<Profile toggleDarkTheme={toggleDarkTheme} />} />
													</Routes>
												</FilterContextProvider>
											</CharacterContextProvider>
										</NoteContextProvider>
									</GameContextProvider>
								) : (
									<Routes>
										{/* Public Routes */}
										<Route path="/" element={<Attract />} />
										<Route path="/login" element={<Login />} />
										<Route path="/signup" element={<Signup />} />
										<Route path="/forgot" element={<ForgotPassword />} />
										<Route path="/forgot/:key" element={<ResetPassword />} />
										<Route path="/verify/:key" element={<VerifyUser />} />
										<Route path="/invite" element={<Invite />} />
										<Route path="/invite/:id" element={<InviteSignup />} />
									</Routes>
								)}
							</main>
						</Router>
					</MenuContextProvider>
				</CountryContextProvider>
			</div>
		</ThemeProvider>
	);
}
