import React, { createContext, useState, useEffect } from "react";
import axios from "axios";

export const GameContext = createContext();

const GameContextProvider = props => {
  const [games, setGames] = useState([]);
  useEffect(() => {
    const fetchData = async function() {
      await axios.get("/api/games").then(res => {
        setGames(res.data.data);
      });
    };
    fetchData();
  }, [games]);
  return (
    <GameContext.Provider value={{ games }}>
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
