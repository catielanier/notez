// Libraries
import React, { useContext } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { ThemeProvider } from "@material-ui/styles";
import { createMuiTheme } from "@material-ui/core/styles";
import { blue, orange } from "@material-ui/core/colors";

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

const theme = createMuiTheme({
	palette: {
		primary: blue,
		secondary: orange,
	},
});

export default function App() {
	const { user } = useContext(UserContext);
	return (
		<ThemeProvider theme={theme}>
			<Title />
			<div className={!user ? "App attract-main" : "App"}>
				<CountryContextProvider>
					<MenuContextProvider>
						<Router>
							<MobileMenu />
							<Header />
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
									<Route path="/edit-game" component={EditGame} />
									<CharacterContextProvider>
										<Route path="/add-character" component={AddCharacter} />
										<Route path="/link-character" component={LinkCharacter} />
										<Route path="/edit-character" component={EditCharacter} />
									</CharacterContextProvider>
									<FilterContextProvider>
										<Route path="/add-filter" component={AddFilter} />
										<Route path="/link-filter" component={LinkFilter} />
										<Route path="/edit-filter" component={EditFilter} />
									</FilterContextProvider>
								</GameContextProvider>
								<Route path="/user-settings" component={UserSettings} />
								<Route path="/profile" component={Profile} />
								<Route exact path="/forgot" component={ForgotPassword} />
								<Route path="/forgot/:key" component={ResetPassword} />
								<Route path="/verify/:key" component={VerifyUser} />
								<Route exact path="/invite" component={Invite} />
								<Route path="/invite/:id" component={InviteSignup} />
							</main>
						</Router>
					</MenuContextProvider>
				</CountryContextProvider>
			</div>
		</ThemeProvider>
	);
}
