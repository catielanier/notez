import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import {
  Container,
  Button,
  Typography,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import { Navigate } from "react-router-dom";
import { getToken } from "../services/tokenService";
import { UserContext } from "../contexts/UserContext";
import { useTranslation } from "react-i18next";

export default function UserSettings() {
  const { t } = useTranslation();
  const { user, loading, success, error, updateRole } = useContext(UserContext);

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const token = getToken();
    async function fetchData() {
      try {
        const res = await axios.get("/api/users", {
          params: { token, user },
        });
        setUsers(res.data.data);
      } catch (e) {
        console.error(e);
      }
    }
    if (user) fetchData();
  }, [user]);

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return (
    <section>
      <Container maxWidth="sm">
        <Typography variant="h5" gutterBottom>
          {t("settings.user.role.edit")}
        </Typography>

        {error && (
          <Typography color="error" gutterBottom>
            {error}
          </Typography>
        )}
        {success && (
          <Typography color="primary" gutterBottom>
            {t("settings.user.updateSuccess")}
          </Typography>
        )}

        <Typography variant="h6">{t("settings.user.select")}</Typography>
        <Select
          options={users.map((u) => ({
            label: `${u.username} (${u.realName} – ${u.country})`,
            value: u._id,
          }))}
          onChange={(opt) => {
            setSelectedUser(opt.value);
            const found = users.find((u) => u._id === opt.value);
            setRole(found?.role || "");
          }}
          value={
            selectedUser
              ? {
                  label:
                    users.find((u) => u._id === selectedUser)?.username || "",
                  value: selectedUser,
                }
              : null
          }
          isLoading={loading}
          placeholder={t("settings.user.selectPlaceholder")}
          styles={{ menu: (base) => ({ ...base, zIndex: 9999 }) }}
        />

        {selectedUser && (
          <>
            <Typography variant="h6" sx={{ mt: 2 }}>
              {t("settings.user.role.assign")}
            </Typography>
            <RadioGroup
              row
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <FormControlLabel
                value="User"
                control={<Radio color="primary" />}
                label={t("settings.user.role.user")}
              />
              <FormControlLabel
                value="Admin"
                control={<Radio color="primary" />}
                label={t("settings.user.role.admin")}
              />
              <FormControlLabel
                value="Banned"
                control={<Radio color="primary" />}
                label={t("settings.user.role.banned")}
              />
            </RadioGroup>

            <Button
              variant="contained"
              color="primary"
              onClick={() => updateRole(selectedUser, role)}
              disabled={loading}
              sx={{ mt: 2 }}
            >
              {t("settings.user.update")}
            </Button>
          </>
        )}
      </Container>
    </section>
  );
}
