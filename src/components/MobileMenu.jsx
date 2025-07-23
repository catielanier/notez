import React, { useContext } from "react";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Link as RouterLink } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import FaceIcon from "@mui/icons-material/Face";
import GamepadIcon from "@mui/icons-material/Gamepad";
import SettingsIcon from "@mui/icons-material/Settings";
import PersonIcon from "@mui/icons-material/Person";
import { useTranslation } from "react-i18next";

import useAuth from "../hooks/useAuth";
import { MenuContext } from "../contexts/MenuContext";

export default function MobileMenu() {
  const { t } = useTranslation();
  const { user, userLoading, logout } = useAuth();
  const role = user?.role;
  const { menu, showMenu } = useContext(MenuContext);

  if (userLoading) return null;

  return (
    <Drawer anchor="right" open={menu} onClose={showMenu}>
      <List>
        {!user && (
          <>
            <ListItem
              button
              component={RouterLink}
              to="/login"
              onClick={showMenu}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={t("header.login")} />
            </ListItem>
            <ListItem
              button
              component={RouterLink}
              to="/signup"
              onClick={showMenu}
            >
              <ListItemIcon>
                <PersonAddIcon />
              </ListItemIcon>
              <ListItemText primary={t("header.signup")} />
            </ListItem>
          </>
        )}

        {user && (
          <>
            <ListItem button component={RouterLink} to="/" onClick={showMenu}>
              <ListItemIcon>
                <GamepadIcon />
              </ListItemIcon>
              <ListItemText primary={t("header.notes.game")} />
            </ListItem>
            <ListItem
              button
              component={RouterLink}
              to="/player"
              onClick={showMenu}
            >
              <ListItemIcon>
                <FaceIcon />
              </ListItemIcon>
              <ListItemText primary={t("header.notes.player")} />
            </ListItem>

            {role === "Admin" && (
              <ListItem
                button
                component={RouterLink}
                to="/user-settings"
                onClick={showMenu}
              >
                <ListItemIcon>
                  <SettingsIcon />
                </ListItemIcon>
                <ListItemText primary={t("header.user.settings")} />
              </ListItem>
            )}

            <ListItem
              button
              component={RouterLink}
              to="/profile"
              onClick={showMenu}
            >
              <ListItemIcon>
                <PersonIcon />
              </ListItemIcon>
              <ListItemText primary={t("header.profile")} />
            </ListItem>
            <ListItem
              button
              onClick={() => {
                logout();
                showMenu();
              }}
            >
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={t("header.logout")} />
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );
}
