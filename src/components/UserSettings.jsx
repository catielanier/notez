import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Container,
  Typography,
  CircularProgress,
  Button,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import useAuth from "../hooks/useAuth";

export default function UserSettings() {
  const { t } = useTranslation();
  const {
    user,
    userLoading,
    userError,
    allUsers,
    allUsersLoading,
    allUsersError,
    updateRole,
    updateRoleLoading,
    updateRoleError,
  } = useAuth();

  const [selectedUserId, setSelectedUserId] = useState("");
  const [selectedRole, setSelectedRole] = useState("");

  // wait for auth
  if (userLoading) return <CircularProgress />;
  if (userError)
    return <Typography color="error">{userError.message}</Typography>;

  // only admins can access
  if (!user || user.role !== "Admin") {
    return (
      <Typography color="error">
        {t("errors.unauthorizedRoleUpdate")}
      </Typography>
    );
  }

  // load users list
  if (allUsersLoading) return <CircularProgress />;
  if (allUsersError)
    return <Typography color="error">{allUsersError.message}</Typography>;

  // build select options
  const options = allUsers.map((u) => ({
    label: `${u.username} (${u.realName} – ${u.country})`,
    value: u._id,
  }));

  const handleSelect = (opt) => {
    const u = allUsers.find((user) => user._id === opt.value);
    setSelectedUserId(u._id);
    setSelectedRole(u.role);
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h5" gutterBottom>
        {t("settings.user.role.edit")}
      </Typography>

      {updateRoleError && (
        <Typography color="error" gutterBottom>
          {updateRoleError.message}
        </Typography>
      )}
      {updateRoleLoading && <CircularProgress size={24} />}

      <Typography variant="h6">{t("settings.user.select")}</Typography>
      <Select
        options={options}
        value={options.find((o) => o.value === selectedUserId) || null}
        onChange={handleSelect}
        placeholder={t("settings.user.selectPlaceholder")}
        styles={{ menu: (base) => ({ ...base, zIndex: 9999 }) }}
      />

      {selectedUserId && (
        <>
          <Typography variant="h6" sx={{ mt: 2 }}>
            {t("settings.user.role.assign")}
          </Typography>
          <RadioGroup
            row
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
          >
            <FormControlLabel
              value="User"
              control={<Radio />}
              label={t("settings.user.role.user")}
            />
            <FormControlLabel
              value="Admin"
              control={<Radio />}
              label={t("settings.user.role.admin")}
            />
            <FormControlLabel
              value="Banned"
              control={<Radio />}
              label={t("settings.user.role.banned")}
            />
          </RadioGroup>

          <Button
            variant="contained"
            color="primary"
            sx={{ mt: 2 }}
            disabled={updateRoleLoading}
            onClick={() =>
              updateRole({ id: selectedUserId, role: selectedRole })
            }
          >
            {t("settings.user.update")}
          </Button>
        </>
      )}
    </Container>
  );
}
