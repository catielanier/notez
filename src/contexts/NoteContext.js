import React, { createContext, useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import { getToken } from "../services/tokenService";
import { LanguageContext } from "./LanguageContext";
import { useTranslation } from "react-i18next";

export const NoteContext = createContext();

const NoteContextProvider = (props) => {
	const { t } = useTranslation();
	const [gameNotes, setGameNotes] = useState([]);
	const [playerNotes, setPlayerNotes] = useState([]);
	const [players, setPlayers] = useState([]);
	const [playerFilters, setPlayerFilters] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [noteEditor, setNoteEditor] = useState(false);
	const [gameNotesGame, setGameNotesGame] = useState("");
	const [myCharacter, setMyCharacter] = useState("");
	const [opponentCharacter, setOpponentCharacter] = useState("");
	const [gameNotesFilter, setGameNotesFilter] = useState("");
	const [player, setPlayer] = useState("");
	const [playerNotesGame, setPlayerNotesGame] = useState("");
	const [playerNotesFilter, setPlayerNotesFilter] = useState("");
	const [displayedGameNotes, setDisplayedGameNotes] = useState([]);
	const [displayedPlayerNotes, setDisplayedPlayerNotes] = useState([]);
	const { user } = useContext(UserContext);
	const { language } = useContext(LanguageContext);
	const apiUrl = process.env.REACT_APP_NOTEZ_API;
	const toggleNoteEditor = () => {
		setNoteEditor(!noteEditor);
	};
	useEffect(() => {
		const fetchData = async function () {
			const resUser = await axios.get(`${apiUrl}/users/${user}`);
			setGameNotes(resUser.data.data.gameNotes);
			setPlayerNotes(resUser.data.data.playerNotes);
			const resFilters = await axios.get(`${apiUrl}/filters/player`);
			setPlayerFilters(resFilters.data.data);
		};
		if (user) {
			fetchData();
		}
	}, [user]);
	useEffect(() => {
		const playerList = [];
		playerNotes.forEach((note) => {
			const index = playerList.indexOf(note.player);
			if (index === -1) {
				playerList.push(note.player);
			}
		});
		if (playerList.length > 0) {
			playerList.sort((x, y) => {
				return x.localeCompare(y);
			});
		}
		setPlayers(playerList);
	}, [playerNotes]);
	const editNote = async (type, id, filter, note) => {
		setLoading(true);
		setError(null);
		const token = getToken();
		if (type === "Game Note") {
			try {
				const res = await axios.put(`${apiUrl}/notes/game/${id}`, {
					filter,
					token,
					note,
				});
				const index = gameNotes.findIndex((x) => x._id === id);
				gameNotes[index] = res.data.data;
				setLoading(false);
				return true;
			} catch (e) {
				setLoading(false);
				setError(e.message);
				return false;
			}
		} else if (type === "Player Note") {
			try {
				const res = await axios.put(`${apiUrl}/notes/player/${id}`, {
					filter: filter.value,
					token,
					note,
				});
				const index = playerNotes.findIndex((x) => x._id === id);
				playerNotes[index] = res.data.data;
				setLoading(false);
				toggleNoteEditor();
				return true;
			} catch (e) {
				setLoading(false);
				setError(e.message);
				return false;
			}
		}
	};
	const postNote = async (
		type,
		game,
		opponent,
		filter,
		body,
		me,
		universal
	) => {
		setLoading(true);
		setError(null);
		const token = getToken();
		let note;
		if (filter !== "" && body !== "") {
			if (type === "Game Note") {
				if (universal) {
					note = {
						filter,
						note: body,
						myCharacter: me,
						game,
						universal,
					};
				} else {
					note = {
						filter,
						note: body,
						myCharacter: me,
						opponentCharacter: opponent,
						game,
					};
				}
				try {
					const res = await axios.post(`${apiUrl}/notes/game`, {
						token,
						user,
						note,
					});
					gameNotes.push(res.data.data);
					setLoading(false);
					return true;
				} catch (e) {
					setError(e.message);
					setLoading(false);
					return false;
				}
			} else if (type === "Player Note") {
				note = {
					filter,
					note: body,
					player: opponent,
					game,
				};
				try {
					const res = await axios.post(`${apiUrl}/notes/player`, {
						token,
						user,
						note,
					});
					playerNotes.push(res.data.data);
					setLoading(false);
					return true;
				} catch (e) {
					setLoading(false);
					setError(e.message);
					return false;
				}
			}
		} else {
			setLoading(false);
			setError(t("notes.new.selectFilter"));
		}
	};
	return (
		<NoteContext.Provider
			value={{
				gameNotes,
				playerNotes,
				loading,
				error,
				toggleNoteEditor,
				noteEditor,
				editNote,
				playerFilters,
				players,
				postNote,
				setGameNotesGame,
				gameNotesGame,
				myCharacter,
				setMyCharacter,
				opponentCharacter,
				setOpponentCharacter,
				gameNotesFilter,
				setGameNotesFilter,
				player,
				setPlayer,
				playerNotesGame,
				setPlayerNotesGame,
				playerNotesFilter,
				setPlayerNotesFilter,
				displayedGameNotes,
				setDisplayedGameNotes,
				displayedPlayerNotes,
				setDisplayedPlayerNotes,
			}}
		>
			{props.children}
		</NoteContext.Provider>
	);
};

export default NoteContextProvider;
