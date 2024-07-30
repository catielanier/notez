import React, {
	useState,
	createContext,
	useContext,
	useEffect,
	useCallback,
} from "react";
import axios from "axios";
import { UserContext } from "./UserContext";
import { getToken } from "../services/tokenService";
import { useTranslation } from "react-i18next";

export const CharacterContext = createContext();

const CharacterContextProvider = (props) => {
	const { t } = useTranslation();
	const [characters, setCharacters] = useState([]);
	const [loading, setLoading] = useState(false);
	const [success, setSuccess] = useState(false);
	const [error, setError] = useState(null);
	const { user } = useContext(UserContext);

	const fetchData = useCallback(async () => {
		const result = await axios.get(`/api/characters`);
		result.data.data.sort((x, y) => {
			return t(x.name).localeCompare(t(y.name));
		});
		setCharacters(result.data.data);
	}, [t]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const createCharacter = async (name, company) => {
		setLoading(true);
		setError(null);
		const token = getToken();
		const character = {
			name,
			company,
		};
		try {
			const res = await axios.post(`/api/characters/new`, {
				user,
				token,
				character,
			});
			characters.push(res.data.data);
			characters.sort((x, y) => {
				return t(x.name).localeCompare(t(y.name));
			});
			setLoading(false);
			setSuccess(true);
		} catch (e) {
			setLoading(false);
			setError(e.message);
		}
	};
	const editCharacter = async (character, name, company) => {
		setLoading(true);
		setError(null);
		const token = getToken();
		try {
			const res = await axios.put(`$/api/characters/`, {
				data: {
					token,
					user,
					name,
					company,
					character,
				},
			});
			const index = characters.findIndex((x) => x._id === character);
			characters[index] = res.data.data;
			setLoading(false);
			setSuccess(true);
		} catch (e) {
			setLoading(false);
			setError(e.message);
		}
	};
	return (
		<CharacterContext.Provider
			value={{
				characters,
				loading,
				success,
				error,
				createCharacter,
				editCharacter,
				setSuccess,
			}}
		>
			{props.children}
		</CharacterContext.Provider>
	);
};

export default CharacterContextProvider;
