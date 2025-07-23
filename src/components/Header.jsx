// src/components/Header.js
import React, { useContext, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Link as RouterLink } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";

import { UserContext } from "../contexts/UserContext";
import { MenuContext } from "../contexts/MenuContext";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  searchButton: {
    marginRight: `-${theme.spacing(2)}px`,
  },
}));

export default function Header() {
  const classes = useStyles();
  const { t } = useTranslation();
  const { user, role, logout: doLogout } = useContext(UserContext);
  const { showMenu, showSearchBar } = useContext(MenuContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (e) => setAnchorEl(e.currentTarget);
  const handleClose = () => setAnchorEl(null);

  return (
    <div className={`${classes.root} header`}>
      <AppBar position="static">
        <Toolbar>
          {/* menu button: mobile only */}
          <Box sx={{ display: { xs: "block", sm: "none" } }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              className={classes.menuButton}
              onClick={showMenu}
            >
              <MenuIcon />
            </IconButton>
          </Box>

          <Typography variant="h6" className={classes.title}>
            {t("app.name")}
          </Typography>

          {/* desktop links */}
          {user === null && (
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button component={RouterLink} to="/login" color="inherit">
                {t("header.login")}
              </Button>
              <Button component={RouterLink} to="/signup" color="inherit">
                {t("header.signup")}
              </Button>
            </Box>
          )}

          {user !== null && (
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <Button component={RouterLink} to="/" color="inherit">
                {t("header.notes.game")}
              </Button>
              <Button component={RouterLink} to="/player" color="inherit">
                {t("header.notes.player")}
              </Button>

              {role === "Admin" && (
                <>
                  <Button onClick={handleClick} color="inherit">
                    {t("header.settings")}
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    keepMounted
                  >
                    <Link
                      component={RouterLink}
                      to="/user-settings"
                      underline="none"
                    >
                      <MenuItem onClick={handleClose}>
                        {t("header.user.settings")}
                      </MenuItem>
                    </Link>
                  </Menu>
                </>
              )}

              <Button component={RouterLink} to="/profile" color="inherit">
                {t("header.profile")}
              </Button>
              <Button color="inherit" onClick={doLogout}>
                {t("header.logout")}
              </Button>
            </Box>
          )}

          {/* mobile search icon */}
          {user !== null && (
            <Box sx={{ display: { xs: "block", sm: "none" } }}>
              <IconButton
                edge="start"
                color="inherit"
                aria-label="search"
                className={classes.searchButton}
                onClick={showSearchBar}
              >
                <SearchIcon />
              </IconButton>
            </Box>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
