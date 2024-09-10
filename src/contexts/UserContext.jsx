import React, { createContext, useState, useEffect } from "react";
import { removeToken, setToken, getToken } from "../services/tokenService";
import { useContext } from "react";
import { LanguageContext } from "./LanguageContext";
import { useTranslation } from "react-i18next";
import { AxiosContext } from "./AxiosContext";

export const UserContext = createContext();

const UserContextProvider = (props) => {
  const { t } = useTranslation();
  const [user, setUser] = useState(localStorage.getItem("notezId") || null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const { language } = useContext(LanguageContext);
  const { axios, refreshHeaders } = useContext(AxiosContext);

  useEffect(() => {
    if (user) {
      axios.get(`/api/users/${user}`).then((res) => {
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
    refreshHeaders();
    setUser(null);
  };

  const doLogin = async (email, password) => {
    setLoading(true);
    setError(null);

    try {
      const res = await axios.post(`/api/users/login`, {
        data: {
          email,
          password,
        },
      });
      if (res) {
        const { token, id } = res.data.data;
        setToken(token);
        refreshHeaders();
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
        await axios({
          method: "POST",
          url: `/api/users/signup`,
          data: {
            email,
            username,
            password,
            realName,
            country,
          },
        });
        setLoading(false);
        setSuccess(true);
      } catch (e) {
        setLoading(false);
        setError(e.message);
      }
    } else {
      setLoading(false);
      setError(t("account.noMatch"));
    }
  };

  const updateRole = async (id, role) => {
    const token = getToken();
    setLoading(true);
    setError(false);
    try {
      await axios
        .put(`/api/users/role`, {
          data: {
            id,
            role,
            user,
            token,
          },
        })
        .then(() => {
          setLoading(false);
          setSuccess(true);
        });
    } catch (e) {
      setLoading(false);
      setError(e.message);
    }
  };

  const updateProfile = async (
    email,
    oldPassword,
    newPassword,
    verifyNewPassword,
    username,
    realName,
    country
  ) => {
    const token = getToken();
    setLoading(true);
    setError(null);
    if (oldPassword !== "") {
      if (newPassword !== "" && newPassword === verifyNewPassword) {
        await axios
          .put(`/api/users/${user}`, {
            data: {
              username,
              email,
              country,
              realName,
              oldPassword,
              newPassword,
              token,
            },
          })
          .then(() => {
            setLoading(false);
            setSuccess(true);
          })
          .catch((err) => {
            setLoading(false);
            setError(err.message);
          });
      } else {
        setLoading(false);
        setError(
          `Your new password is either invalid or doesn't match your password verification. (Note: If you don't want to change your password, leave the "Old Password" field blank.)`
        );
      }
    } else {
      await axios
        .put(`/api/users/${user}`, {
          data: {
            username,
            email,
            country,
            realName,
            token,
          },
        })
        .then(() => {
          setLoading(false);
          setSuccess(true);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
        });
    }
  };

  const requestReset = async (email) => {
    this.loading(false);
    this.error(null);
    await axios
      .post(`/api/users/forgot`, { email, language })
      .then(() => {
        setLoading(false);
        setSuccess(true);
      })
      .catch((err) => {
        setLoading(false);
        setError(err.message);
      });
  };

  const resetPassword = async (password, verifyPassword, key) => {
    setLoading(true);
    setError(null);
    if (password === verifyPassword) {
      await axios
        .post(`/api/users/reset`, { key, password })
        .then((_) => {
          setLoading(false);
          setSuccess(true);
        })
        .catch((err) => {
          setLoading(false);
          setError(err.message);
        });
    } else {
      setLoading(false);
      setError(t("account.noMatch"));
    }
  };

  return (
    <UserContext.Provider
      value={{
        user,
        role,
        logout,
        doLogin,
        error,
        success,
        loading,
        signup,
        updateRole,
        updateProfile,
        requestReset,
        resetPassword,
      }}
    >
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
