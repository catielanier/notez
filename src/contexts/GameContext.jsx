import React, {
	createContext,
	useState,
	useEffect,
	useContext,
	useCallback,
} from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";
import { UserContext } from "./UserContext";
import { getToken } from "../services/tokenService";

export const GameContext = createContext();

const GameContextProvider = (props) => {
	const { t } = useTranslation();
	const [games, setGames] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);
	const [characters, setCharacters] = useState([]);
	const [filters, setFilters] = useState([]);
	const { user } = useContext(UserContext);
	const fetchData = useCallback(async () => {
		await axios.get(`/api/games`).then((res) => {
			res.data.data.sort((x, y) => {
				return t(x.name).localeCompare(t(y.name));
			});
			setGames(res.data.data);
		});
	}, [t]);
	useEffect(() => {
		fetchData();
	}, [fetchData]);
	const updateDropdowns = (game, type) => {
		const index = games.findIndex((x) => x._id === game);
		if (type === "game") {
			const { characters: allCharacters, filters: allFilters } = games[index];
			allCharacters.sort((x, y) => {
				return t(x.name).localeCompare(t(y.name));
			});
			allFilters.sort((x, y) => {
				return t(x.name).localeCompare(t(y.name));
			});
			setCharacters(allCharacters);
			setFilters(allFilters);
		}
	};
	const createGame = async (name) => {
		setLoading(true);
		setError(null);
		const token = getToken();
		const game = {
			name,
		};
		try {
			const res = await axios.post(`/api/games/new`, {
				user,
				token,
				game,
			});
			games.push(res.data.data);
			games.sort((x, y) => {
				return t(x.name).localeCompare(t(y.name));
			});
			setLoading(false);
			setSuccess(true);
		} catch (e) {
			setLoading(false);
			setError(e.message);
		}
	};
	const editGame = async (game, name) => {
		setLoading(true);
		setError(null);
		const token = getToken();
		try {
			const res = await axios.put(`/api/games/`, {
				data: {
					token,
					user,
					name,
					game,
				},
			});
			const index = games.findIndex((x) => x._id === game);
			games[index] = res.data.data;
			setLoading(false);
			setSuccess(true);
		} catch (e) {
			setLoading(false);
			setError(e.message);
		}
	};
	const connectCharacters = async (game, characters) => {
		setLoading(true);
		setError(null);
		const token = getToken();
		try {
			const res = await axios.put(`/api/games/${game}/character`, {
				user,
				token,
				characters,
				game,
			});
			console.log(res);
			await fetchData();
			setLoading(false);
			setSuccess(true);
		} catch (e) {
			setLoading(false);
			setError(e.message);
		}
	};
	const connectFilters = async (game, filters) => {
		setLoading(true);
		setError(null);
		const token = getToken();
		try {
			const res = await axios.put(`/api/games/${game}/filter`, {
				user,
				token,
				filters,
				game,
			});
			console.log(res);
			await fetchData();
			setLoading(false);
			setSuccess(true);
		} catch (e) {
			setLoading(false);
			setError(e.message);
		}
	};
	return (
		<GameContext.Provider
			value={{
				games,
				loading,
				error,
				success,
				createGame,
				connectCharacters,
				connectFilters,
				editGame,
				updateDropdowns,
				characters,
				filters,
			}}
		>
			{props.children}
		</GameContext.Provider>
	);
};

export default GameContextProvider;
