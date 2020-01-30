import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import {
  Container,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { getToken } from "../services/tokenService";
import localeSelect from "../services/localeSelect";
import {
  editUserRoles,
  selectUser,
  assignRole,
  user as userLocale,
  admin,
  banned,
  updateUser
} from "../data/locales";
import { UserContext } from '../contexts/UserContext';
import { LanguageContext } from '../contexts/LanguageContext';

export default function UserSettings() {
  const { user, loading, success, error, updateRole } = useContext(UserContext);
  const { language } = useContext(LanguageContext);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');
  const [role, setRole] = useState('');
  useEffect(() => {
    const token = getToken();
    async function fetchData() {
      await axios
      .get("/api/users", {
        params: {
          token,
          user
        }
      })
      .then(res => {
        setUsers(res.data.data);
      });
    }
    fetchData();
  }, [user])
  if (!user) {
    return <Redirect to="/" />
  }
  return (
    <section>
      <Container maxWidth="sm">
        <Typography variant="h5" gutterBottom>
          {localeSelect(language, editUserRoles)}
        </Typography>
        <Typography variant="h6">
          {localeSelect(language, selectUser)}
        </Typography>
        <Select
          options={users.map(user => {
            return {
              label: `${user.username} (${user.realName} - ${user.country})`,
              value: user._id
            };
          })}
          onChange={e => {
            setSelectedUser(e.value);
            const index = users.findIndex(x => x._id === e.value);
            setRole(users[index].role);
          }}
        />
      {selectedUser !== "" && role !== "" && (
          <>
            <Typography variant="h6">
              {localeSelect(language, assignRole)}
            </Typography>
            <RadioGroup
              onChange={e => {
                setRole(e.target.value)
              }}
              value={role}
            >
              <FormControlLabel
                value="User"
                control={<Radio color="primary" />}
                label={localeSelect(language, userLocale)}
              />
              <FormControlLabel
                value="Admin"
                control={<Radio color="primary" />}
                label={localeSelect(language, admin)}
              />
              <FormControlLabel
                value="Banned"
                control={<Radio color="primary" />}
                label={localeSelect(language, banned)}
              />
            </RadioGroup>
            <Button
              color="primary"
              variant="contained"
              onClick={e => {
                e.preventDefault();
                updateRole(selectedUser, role);
              }}
            >
              {localeSelect(language, updateUser)}
            </Button>
          </>
        )}
      </Container>
    </section>
  );
}
