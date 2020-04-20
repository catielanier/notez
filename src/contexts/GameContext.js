import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import axios from "axios";
import { LanguageContext } from "./LanguageContext";
import sort from "../services/sort";
import { UserContext } from "./UserContext";
import { getToken } from "../services/tokenService";

export const GameContext = createContext();

const GameContextProvider = (props) => {
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [characters, setCharacters] = useState([]);
  const [filters, setFilters] = useState([]);
  const { language } = useContext(LanguageContext);
  const { user } = useContext(UserContext);
  const fetchData = useCallback(async () => {
    await axios.get("/api/games").then((res) => {
      sort(res.data.data, language);
      setGames(res.data.data);
    });
  }, [language]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const updateDropdowns = (game, type) => {
    const index = games.findIndex((x) => x._id === game);
    if (type === "game") {
      const { characters: allCharacters, filters: allFilters } = games[index];
      sort(allCharacters, language);
      sort(allFilters, language);
      setCharacters(allCharacters);
      setFilters(allFilters);
    }
  };
  const createGame = async (en, ja, ko, cn, tw, hk) => {
    setLoading(true);
    setError(null);
    const token = getToken();
    const game = {
      name: en,
      name_ja: ja,
      name_ko: ko,
      "name_zh-cn": cn,
      "name_zh-tw": tw,
      "name_zh-hk": hk,
    };
    try {
      const res = await axios.post("/api/games/new", {
        user,
        token,
        game,
      });
      games.push(res.data.data);
      sort(games, language);
      setLoading(false);
      setSuccess(true);
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };
  const editGame = async (
    game,
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
      const res = await axios.put(`/api/games/`, {
        data: {
          token,
          user,
          name,
          name_ja,
          name_ko,
          name_cn,
          name_tw,
          name_hk,
          game,
        },
      });
      const index = games.findIndex((x) => x._id === game);
      games[index] = res.data.data;
      setLoading(false);
      setSuccess(true);
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };
  const connectCharacters = async (game, characters) => {
    setLoading(true);
    setError(null);
    const token = getToken();
    try {
      const res = await axios.put(`/api/games/${game}/character`, {
        user,
        token,
        characters,
        game,
      });
      await fetchData();
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };
  const connectFilters = async (game, filters) => {
    setLoading(true);
    setError(null);
    const token = getToken();
    try {
      const res = await axios.put(`/api/games/${game}/filter`, {
        user,
        token,
        filters,
        game,
      });
      await fetchData();
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };
  return (
    <GameContext.Provider
      value={{
        games,
        loading,
        error,
        success,
        createGame,
        connectCharacters,
        connectFilters,
        editGame,
        updateDropdowns,
        characters,
        filters,
      }}
    >
      {props.children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;
