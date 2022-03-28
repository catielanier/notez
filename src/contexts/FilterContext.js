import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { LanguageContext } from "./LanguageContext";
import sort from "../services/sort";
import { UserContext } from "./UserContext";
import { getToken } from "../services/tokenService";

export const FilterContext = createContext();

const FilterContextProvider = (props) => {
	const [filters, setFilters] = useState([]);
	const [gameFilters, setGameFilters] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);
	const { language } = useContext(LanguageContext);
	const { user } = useContext(UserContext);
	useEffect(() => {
		const fetchData = async function () {
			await axios.get(`/api/filters`).then((res) => {
				sort(res.data.data, language);
				setFilters(res.data.data);
				const games = [];
				res.data.data.forEach((filter) => {
					if (!filter.playerFilter) {
						games.push(filter);
					}
				});
				setGameFilters(games);
			});
		};
		fetchData();
	}, [language]);
	const createFilter = async (en, ja, ko, cn, tw, hk, player) => {
		setLoading(true);
		setError(null);
		const token = getToken();
		const filter = {
			name: en,
			name_ja: ja,
			name_ko: ko,
			"name_zh-cn": cn,
			"name_zh-tw": tw,
			"name_zh-hk": hk,
			playerFilter: player,
		};
		try {
			const res = await axios.post(`/api/filters/new`, {
				user,
				token,
				filter,
			});
			filters.push(res.data.data);
			if (!res.data.data.playerFilter) {
				gameFilters.push(res.data.data);
			}
			sort(filters, language);
			sort(gameFilters, language);
			setLoading(false);
			setSuccess(true);
		} catch (e) {
			setLoading(false);
			setError(e.message);
		}
	};
	const editFilter = async (
		filter,
		name,
		name_ja,
		name_ko,
		name_cn,
		name_tw,
		name_hk
	) => {
		setLoading(true);
		setError(null);
		const token = getToken();
		try {
			const res = await axios.put(`/api/filters/`, {
				data: {
					token,
					user,
					name,
					name_ja,
					name_ko,
					name_cn,
					name_tw,
					name_hk,
					filter,
				},
			});
			const index = filters.findIndex((x) => x._id === filter);
			filters[index] = res.data.data;
			setLoading(false);
			setSuccess(true);
		} catch (e) {
			setLoading(false);
			setError(e.message);
		}
	};
	return (
		<FilterContext.Provider
			value={{
				filters,
				loading,
				error,
				success,
				createFilter,
				gameFilters,
				editFilter,
			}}
		>
			{props.children}
		</FilterContext.Provider>
	);
};

export default FilterContextProvider;
