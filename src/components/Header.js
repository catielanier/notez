import React, { useContext } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Typography,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  Link,
  Hidden
} from "@material-ui/core";
import {
  title,
  login,
  signup,
  gameNotes,
  playerNotes,
  settings,
  addGame,
  addCharacter,
  addFilter,
  editGame,
  editCharacter,
  editFilter,
  linkCharacters,
  linkFilters,
  userSettings,
  profile,
  logout
} from "../data/locales";
import localeSelect from "../services/localeSelect";
import MenuIcon from "@material-ui/icons/Menu";
import { UserContext } from "../contexts/UserContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { MenuContext } from "../contexts/MenuContext";

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    flexGrow: 1
  }
}));

export default function Header() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const { user, role, logout: doLogout } = useContext(UserContext);
  const { language } = useContext(LanguageContext);
  const { showMenu } = useContext(MenuContext);
  return (
    <div className={(classes.root, "header")}>
      <AppBar position="static">
        <Toolbar>
          <Hidden smUp>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              className={classes.menuButton}
              onClick={showMenu}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Typography variant="h6" className={classes.title}>
            {localeSelect(language, title)}
          </Typography>
          {user === undefined && (
            <Hidden xsDown>
              <Button
                component={React.forwardRef((props, ref) => (
                  <RouterLink innerRef={ref} to="/login" {...props} />
                ))}
                color="inherit"
              >
                {localeSelect(language, login)}
              </Button>
              <Button
                component={React.forwardRef((props, ref) => (
                  <RouterLink innerRef={ref} to="/signup" {...props} />
                ))}
                color="inherit"
              >
                {localeSelect(language, signup)}
              </Button>
            </Hidden>
          )}
          {user !== undefined && (
            <Hidden xsDown>
              <Button
                component={React.forwardRef((props, ref) => (
                  <RouterLink innerRef={ref} to="/" {...props} />
                ))}
                color="inherit"
              >
                {localeSelect(language, gameNotes)}
              </Button>
              <Button
                component={React.forwardRef((props, ref) => (
                  <RouterLink innerRef={ref} to="/player" {...props} />
                ))}
                color="inherit"
              >
                {localeSelect(language, playerNotes)}
              </Button>
              {role === "Admin" && (
                <>
                  <Button onClick={handleClick} color="inherit">
                    {localeSelect(language, settings)}
                  </Button>
                  <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <Link
                      component={React.forwardRef((props, ref) => (
                        <RouterLink innerRef={ref} to="/add-game" {...props} />
                      ))}
                    >
                      <MenuItem onClick={handleClose}>
                        {localeSelect(language, addGame)}
                      </MenuItem>
                    </Link>
                    <Link
                      component={React.forwardRef((props, ref) => (
                        <RouterLink
                          innerRef={ref}
                          to="/add-character"
                          {...props}
                        />
                      ))}
                    >
                      <MenuItem onClick={handleClose}>
                        {localeSelect(language, addCharacter)}
                      </MenuItem>
                    </Link>
                    <Link
                      component={React.forwardRef((props, ref) => (
                        <RouterLink
                          innerRef={ref}
                          to="/add-filter"
                          {...props}
                        />
                      ))}
                    >
                      <MenuItem onClick={handleClose}>
                        {localeSelect(language, addFilter)}
                      </MenuItem>
                    </Link>
                    <Link
                      component={React.forwardRef((props, ref) => (
                        <RouterLink innerRef={ref} to="/edit-game" {...props} />
                      ))}
                    >
                      <MenuItem onClick={handleClose}>
                        {localeSelect(language, editGame)}
                      </MenuItem>
                    </Link>
                    <Link
                      component={React.forwardRef((props, ref) => (
                        <RouterLink
                          innerRef={ref}
                          to="/edit-character"
                          {...props}
                        />
                      ))}
                    >
                      <MenuItem onClick={handleClose}>
                        {localeSelect(language, editCharacter)}
                      </MenuItem>
                    </Link>
                    <Link
                      component={React.forwardRef((props, ref) => (
                        <RouterLink
                          innerRef={ref}
                          to="/edit-filter"
                          {...props}
                        />
                      ))}
                    >
                      <MenuItem onClick={handleClose}>
                        {localeSelect(language, editFilter)}
                      </MenuItem>
                    </Link>
                    <Link
                      component={React.forwardRef((props, ref) => (
                        <RouterLink
                          innerRef={ref}
                          to="/link-character"
                          {...props}
                        />
                      ))}
                    >
                      <MenuItem onClick={handleClose}>
                        {localeSelect(language, linkCharacters)}
                      </MenuItem>
                    </Link>
                    <Link
                      component={React.forwardRef((props, ref) => (
                        <RouterLink
                          innerRef={ref}
                          to="/link-filter"
                          {...props}
                        />
                      ))}
                    >
                      <MenuItem onClick={handleClose}>
                        {localeSelect(language, linkFilters)}
                      </MenuItem>
                    </Link>
                    <Link
                      component={React.forwardRef((props, ref) => (
                        <RouterLink
                          innerRef={ref}
                          to="/user-settings"
                          {...props}
                        />
                      ))}
                    >
                      <MenuItem onClick={handleClose}>
                        {localeSelect(language, userSettings)}
                      </MenuItem>
                    </Link>
                  </Menu>
                </>
              )}
              <Button
                color="inherit"
                component={React.forwardRef((props, ref) => (
                  <RouterLink innerRef={ref} to="/profile" {...props} />
                ))}
              >
                {localeSelect(language, profile)}
              </Button>
              <Button color="inherit" onClick={doLogout}>
                {localeSelect(language, logout)}
              </Button>
            </Hidden>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
