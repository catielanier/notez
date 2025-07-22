// src/components/SearchBar.js
import React, { useContext } from "react";
import Drawer from "@mui/material/Drawer";
import Container from "@mui/material/Container";
import { makeStyles } from "@mui/styles";
import { MenuContext } from "../contexts/MenuContext";
import GameNotesSearch from "./GameNotesSearch";
import PlayerNoteSearch from "./PlayerNoteSearch";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(5),
  },
}));

export default function SearchBar({ noteType }) {
  const classes = useStyles();
  const { searchBar, showSearchBar } = useContext(MenuContext);

  return (
    <Drawer anchor="left" open={searchBar} onClose={showSearchBar}>
      <Container className={classes.wrapper}>
        {noteType === "game" ? <GameNotesSearch /> : <PlayerNoteSearch />}
      </Container>
    </Drawer>
  );
}
