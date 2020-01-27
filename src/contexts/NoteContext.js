import React, { createContext, useState, useEffect } from "react";
import { useContext } from "react";
import { UserContext } from "./UserContext";
import axios from "axios";

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
  return (
    <NoteContext.Provider
      value={{
        gameNotes,
        playerNotes,
        loading,
        error,
        toggleNoteEditor,
        noteEditor
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteContextProvider;
