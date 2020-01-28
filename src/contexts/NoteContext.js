import React, { createContext, useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";
import { getToken } from "../services/tokenService";

export const NoteContext = createContext();

const NoteContextProvider = props => {
  const [gameNotes, setGameNotes] = useState([]);
  const [playerNotes, setPlayerNotes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [noteEditor, setNoteEditor] = useState(false);
  const toggleNoteEditor = () => {
    setNoteEditor(!noteEditor);
  };
  const { user } = useContext(UserContext);
  useEffect(() => {
    const fetchData = async function() {
      const resUser = await axios.get(`/api/users/${user}`);
      setGameNotes(resUser.data.data.gameNotes);
      setPlayerNotes(resUser.data.data.playerNotes);
    };
    fetchData();
  }, [user]);
  const editNote = async (type, id, filter, note) => {
    setLoading(true);
    setError(null);
    const token = getToken();
    if (type === "Game Note") {
      try {
        const res = await axios.put(`/api/notes/game/${id}`, {
          filter,
          token,
          note
        });
        const index = gameNotes.findIndex(x => x._id === id);
        gameNotes[index] = res.data.data;
        setLoading(false);
        return true;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        return false;
      }
    } else if (type === "Player Note") {
      try {
        const res = await axios.put(`/api/notes/player/${id}`, {
          filter: filter.value,
          token,
          note
        });
        const index = playerNotes.findIndex(x => x._id === id);
        playerNotes[index] = res.data.data;
        setLoading(false);
        toggleNoteEditor();
        return true;
      } catch (e) {
        setLoading(false);
        setError(e.message);
        return false;
      }
    }
  };
  return (
    <NoteContext.Provider
      value={{
        gameNotes,
        playerNotes,
        loading,
        error,
        toggleNoteEditor,
        noteEditor,
        editNote
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteContextProvider;
