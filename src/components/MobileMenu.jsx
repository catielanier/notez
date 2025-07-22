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
import { UserContext } from "../contexts/UserContext";
import { MenuContext } from "../contexts/MenuContext";
import { useTranslation } from "react-i18next";

export default function MobileMenu() {
  const { t } = useTranslation();
  const { user, role, logout } = useContext(UserContext);
  const { menu, showMenu } = useContext(MenuContext);

  return (
    <Drawer anchor="right" open={menu} onClose={showMenu}>
      <List>
        {user === undefined && (
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

        {user !== undefined && (
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
              <>
                {[["header.user.settings", "/user-settings", SettingsIcon]].map(
                  ([key, path, Icon], idx) => (
                    <ListItem
                      button
                      component={RouterLink}
                      to={path}
                      onClick={showMenu}
                      key={idx}
                    >
                      <ListItemIcon>
                        <Icon />
                      </ListItemIcon>
                      <ListItemText primary={t(key)} />
                    </ListItem>
                  )
                )}
              </>
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
