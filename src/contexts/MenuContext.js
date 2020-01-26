import React, { useState, createContext } from "react";

export const MenuContext = createContext();

const MenuContextProvider = props => {
  const [menu, openMenu] = useState(false);
  const showMenu = () => {
    openMenu(!menu);
  };
  return (
    <MenuContext.Provider value={{ menu, showMenu }}>
      {props.children}
    </MenuContext.Provider>
  );
};

export default MenuContextProvider;
