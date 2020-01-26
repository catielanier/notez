import React, { createContext, useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

export const NoteContext = createContext();

const NoteContextProvider = props => {
  const [gameNotes, setGameNotes] = useState(null);
  const [playerNotes, setPlayerNotes] = useState(null);
  const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchData = async function() {
      const resUser = await axios.get(`/api/users/${user}`);
      setGameNotes(resUser.data.data.gameNotes);
      setPlayerNotes(resUser.data.data.playerNotes);
    };
    fetchData();
  }, [gameNotes, playerNotes, user]);
  return (
    <NoteContext.Provider value={{ gameNotes, playerNotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteContextProvider;
