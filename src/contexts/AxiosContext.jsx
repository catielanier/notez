import axios from "axios";
import React, { createContext, useContext } from "react";
import { getToken } from "../services/tokenService";
import { LanguageContext } from "./LanguageContext";

export const AxiosContext = createContext();

const AxiosContextProvider = (props) => {
  const { language } = useContext(LanguageContext);
  const instance = axios.create({});
  const token = getToken();

  const refreshHeaders = () => {
    instance.defaults.headers.common["Accept-Language"] = language;
    instance.defaults.headers.common["Authorization"] =
      token && `Bearer ${token}`;
  };

  return (
    <AxiosContext.Provider value={{ axios: instance, refreshHeaders }}>
      {props.children}
    </AxiosContext.Provider>
  );
};

export default AxiosContextProvider;
