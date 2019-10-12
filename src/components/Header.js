import React from "react";
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
  Link
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

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

export default function Header(props) {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            NoteZ
          </Typography>
          {!props.user && (
            <>
              <Button
                component={React.forwardRef((props, ref) => (
                  <RouterLink innerRef={ref} to="/login" {...props} />
                ))}
                color="inherit"
              >
                Login
              </Button>
              <Button
                component={React.forwardRef((props, ref) => (
                  <RouterLink innerRef={ref} to="/signup" {...props} />
                ))}
                color="inherit"
              >
                Signup
              </Button>
            </>
          )}
          {props.user && (
            <>
              <Button
                component={React.forwardRef((props, ref) => (
                  <RouterLink innerRef={ref} to="/game" {...props} />
                ))}
                color="inherit"
              >
                Game Notes
              </Button>
              <Button
                component={React.forwardRef((props, ref) => (
                  <RouterLink innerRef={ref} to="/player" {...props} />
                ))}
                color="inherit"
              >
                Player Notes
              </Button>
              {props.role === "Admin" && (
                <>
                  <Button onClick={handleClick} color="inherit">
                    Settings
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
                      <MenuItem onClick={handleClose}>Add Games</MenuItem>
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
                      <MenuItem onClick={handleClose}>Add Characters</MenuItem>
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
                      <MenuItem onClick={handleClose}>Add Filters</MenuItem>
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
                      <MenuItem onClick={handleClose}>Link Characters</MenuItem>
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
                      <MenuItem onClick={handleClose}>Link Filters</MenuItem>
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
                      <MenuItem onClick={handleClose}>User Settings</MenuItem>
                    </Link>
                  </Menu>
                </>
              )}
              <Button color="inherit">Logout</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
