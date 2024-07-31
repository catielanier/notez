import React, { useContext } from "react";
import { Drawer, Container, makeStyles } from "@material-ui/core";
import { MenuContext } from "../contexts/MenuContext";
import GameNotesSearch from "./GameNotesSearch";
import PlayerNoteSearch from "./PlayerNoteSearch";

const useStyles = makeStyles((theme) => ({
  wrapper: {
    padding: theme.spacing(2),
    paddingTop: theme.spacing(5),
  },
}));

export default function SearchBar(props) {
  const classes = useStyles();
  const { noteType } = props;
  const { searchBar, showSearchBar } = useContext(MenuContext);
  return (
    <Drawer anchor="left" open={searchBar} onClose={showSearchBar}>
      <Container className={classes.wrapper}>
        {noteType === "game" ? <GameNotesSearch /> : <PlayerNoteSearch />}
      </Container>
    </Drawer>
  );
}
