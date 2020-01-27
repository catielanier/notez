import React, { createContext, useState, useEffect } from "react";
import axios from "axios";
import { removeToken, setToken } from "../services/tokenService";
import { useContext } from "react";
import { LanguageContext } from "./LanguageContext";
import localeSelect from "../services/localeSelect";
import { noMatch } from "../data/locales";

export const UserContext = createContext();

const UserContextProvider = props => {
  const [user, setUser] = useState(localStorage.getItem("notezId") || null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(true);
  const { language } = useContext(LanguageContext);

  useEffect(() => {
    // const userId = localStorage.getItem("notezId") || null;
    // setUser(userId);
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
  };

  const doLogin = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post("/api/users/login", {
        data: {
          email,
          password
        }
      });
      if (res) {
        const { token, id } = res.data.data;
        setToken(token);
        localStorage.setItem("notezId", id);
        setUser(id);
        setLoading(false);
        setSuccess(true);
      }
    } catch (e) {
      setError(e.message);
      setLoading(false);
    }
  };

  const signup = async (
    email,
    password,
    verifyPassword,
    username,
    realName,
    country
  ) => {
    setLoading(true);
    setError(null);
    if (password === verifyPassword) {
      try {
        const res = await axios.post("/api/users/signup", {
          data: {
            email,
            username,
            password,
            realName,
            country
          },
          params: {
            language
          }
        });
        setLoading(false);
        setSuccess(true);
      } catch (e) {
        setLoading(false);
        setError(e.message);
      }
    } else {
      setLoading(false);
      setError(localeSelect(language, noMatch));
    }
  };

  return (
    <UserContext.Provider
      value={{ user, role, logout, doLogin, error, success, loading, signup }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
