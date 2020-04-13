import React, { useState, createContext } from "react";

export const MenuContext = createContext();

const MenuContextProvider = (props) => {
  const [menu, openMenu] = useState(false);
  const [searchBar, openSearchBar] = useState(false);
  const showMenu = () => {
    openMenu(!menu);
  };

  const showSearchBar = () => {
    openSearchBar(!searchBar);
  };

  return (
    <MenuContext.Provider value={{ menu, showMenu, searchBar, showSearchBar }}>
      {props.children}
    </MenuContext.Provider>
  );
};

export default MenuContextProvider;
