import React, { useContext } from "react";
import { Drawer } from "@material-ui/core";
import { LanguageContext } from "../contexts/LanguageContext";
import { MenuContext } from "../contexts/MenuContext";

export default function SearchBar(props) {
  const { noteType } = props;
  const { language } = useContext(LanguageContext);
  const { searchBar, showSearchBar } = useContext(MenuContext);
  return (
    <Drawer anchor="left" open={searchBar} onClose={showSearchBar}></Drawer>
  );
}
