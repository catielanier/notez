import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";
import { LanguageContext } from "./LanguageContext";
import { UserContext } from "./UserContext";
import getToken from "../services/tokenService";
import sort from "../services/sort";

export const CharacterContext = createContext();

const CharacterContextProvider = props => {
  const [characters, setCharacters] = useState([]);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { language } = useContext(LanguageContext);
  const { user } = useContext(UserContext);
  useEffect(() => {
    async function fetchData() {
      const result = await axios.get("/api/characters");
      sort(result.data.data, language);
      setCharacters(result.data.data);
    }
    fetchData();
  }, [language]);
  const createCharacter = async (en, ja, ko, cn, tw, hk) => {
    setLoading(true);
    setError(null);
    const token = getToken();
    const character = {
      name: en,
      name_ja: ja,
      name_ko: ko,
      "name_zh-cn": cn,
      "name_zh-tw": tw,
      "name_zh-hk": hk
    };
    try {
      const res = await axios.post("/api/characters/new", {
        user,
        token,
        character
      });
      characters.push(res.data.data);
      sort(characters, language);
      setLoading(false);
      setSuccess(true);
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };
  return (
    <CharacterContext.Provider
      value={{ characters, loading, success, error, createCharacter }}
    >
      {props.children}
    </CharacterContext.Provider>
  );
};

export default CharacterContextProvider;
