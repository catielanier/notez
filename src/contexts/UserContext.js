import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { removeToken } from "../services/tokenService";

export const UserContext = createContext();

const UserContextProvider = props => {
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const userId = localStorage.getItem("notezId") || null;
    setUser(userId);
    if (user) {
      axios.get(`/api/users/${user}`).then(res => {
        const { role: userRole } = res.data.data;
        setRole(userRole);
      });
    } else {
      setRole(null);
    }
  }, [user]);

  const logout = () => {
    removeToken();
    localStorage.removeItem("notezId");
    setUser(null);
    setRole(null);
  };

  return (
    <UserContext.Provider value={{ user, role, logout }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
