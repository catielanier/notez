import React, { createContext, useState, useEffect, useContext } from "react";
import axios from "axios";
import { LanguageContext } from "./LanguageContext";

export const GameContext = createContext();

const GameContextProvider = props => {
  const [games, setGames] = useState([]);
  const { language } = useContext(LanguageContext);
  useEffect(() => {
    const fetchData = async function() {
      await axios.get("/api/games").then(res => {
        if (language === "ja") {
          res.data.data.sort((x, y) => {
            return x.name_ja.localeCompare(y.name_ja);
          });
        } else if (language === "ko") {
          res.data.data.sort((x, y) => {
            return x.name_ko.localeCompare(y.name_ko);
          });
        } else if (
          language === "zh-CN" ||
          language === "zh-TW" ||
          language === "zh-HK"
        ) {
          res.data.data.sort((x, y) => {
            return x["name_zh-cn"].localeCompare(y["name_zh-cn"]);
          });
        } else {
          res.data.data.sort((x, y) => {
            return x.name.localeCompare(y.name);
          });
        }
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
