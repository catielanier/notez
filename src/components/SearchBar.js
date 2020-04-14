import React, { useContext } from "react";
import { Drawer } from "@material-ui/core";
import { MenuContext } from "../contexts/MenuContext";
import GameNotesSearch from "./GameNotesSearch";

export default function SearchBar(props) {
  const { noteType } = props;
  const { searchBar, showSearchBar } = useContext(MenuContext);
  return (
    <Drawer anchor="left" open={searchBar} onClose={showSearchBar}>
      {noteType === "game" ? <GameNotesSearch /> : null}
    </Drawer>
  );
}
