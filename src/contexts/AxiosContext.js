import axios from "axios";
import React, { createContext, useContext } from "react";
import { LanguageContext } from "./LanguageContext";

export const AxiosContext = createContext();

const AxiosContextProvider = (props) => {
	const { language } = useContext(LanguageContext);
	const instance = axios.create({});

	instance.defaults.headers.common["Accept-Language"] = language;
	return (
		<AxiosContext.Provider value={{ axios: instance }}>
			{props.children}
		</AxiosContext.Provider>
	);
};

export default AxiosContextProvider;
