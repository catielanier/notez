import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { LanguageContext } from "./LanguageContext";
import sort from "../services/sort";

export const CharacterContext = createContext();

const CharacterContextProvider = props => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("/api/characters");
      sort(result.data.data, language);
      setCharacters(result.data.data);
    }
    fetchData();
  }, [language]);
  return (
    <CharacterContext.Provider value={{ characters, loading, success, error }}>
      {props.children}
    </CharacterContext.Provider>
  );
};

export default CharacterContextProvider;
