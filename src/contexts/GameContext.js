import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { LanguageContext } from "./LanguageContext";
import sort from "../services/sort";

export const GameContext = createContext();

const GameContextProvider = props => {
  const [games, setGames] = useState([]);
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    const fetchData = async function() {
      await axios.get("/api/games").then(res => {
        sort(res.data.data, language);
        setGames(res.data.data);
      });
    };
    fetchData();
  }, [language]);
  return (
    <GameContext.Provider value={{ games }}>
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
