import React, { createContext, useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import axios from "axios";

export const CountryContext = createContext();

const CountryContextProvider = (props) => {
	const { i18n } = useTranslation();
	const [countries, setCountries] = useState([]);

	const fetchData = useCallback(async () => {
		await axios.get(`https://restcountries.com/v3.1/all`).then((res) => {
			const unsortedCountries = res.data;
			const countryData = unsortedCountries.map((country) => {
				switch (i18n.language) {
					case "ko":
						return {
							label: country.translations.kor.common,
							value: country.cca3,
						};
					case "ja":
						return {
							label: country.translations.jpn.common,
							value: country.cca3,
						};
					case "zh":
						if (country.name.nativeName.zho) {
							return {
								label: country.name.nativeName.zho.common,
								value: country.cca3,
							};
						} else {
							return {
								label: country.translations.zho.common,
								value: country.cca3,
							};
						}
					case "es":
						return {
							label: country.translations.spa.common,
							value: country.cca3,
						};
					case "pt":
						return {
							label: country.translations.por.common,
							value: country.cca3,
						};
					case "it":
						return {
							label: country.translations.ita.common,
							value: country.cca3,
						};
					case "ru":
						return {
							label: country.translations.rus.common,
							value: country.cca3,
						};
					default:
						return {
							label: country.name.common,
							value: country.cca3,
						};
				}
			});
			countryData.sort((a, b) => {
				a.label.localeCompare(b.label);
			});
			setCountries(countryData);
		});
	}, [i18n]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	return (
		<CountryContext.Provider value={{ countries }}>
			{props.children}
		</CountryContext.Provider>
	);
};

export default CountryContextProvider;
