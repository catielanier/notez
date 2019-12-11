import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import {
  ExitToApp,
  PersonAdd,
  Face,
  Gamepad,
  Add,
  Link as LinkIcon,
  Settings,
  Person,
  Edit
} from "@material-ui/icons";
import {
  login,
  signup,
  gameNotes,
  playerNotes,
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

export default function MobileMenu(props) {
  return (
    <Drawer open={props.menu} onClose={props.showMenu}>
      <List>
        {!props.user && (
          <>
            <ListItem
              button
              component={React.forwardRef((props, ref) => (
                <RouterLink innerRef={ref} to="/login" {...props} />
              ))}
            >
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText>{localeSelect(props.language, login)}</ListItemText>
            </ListItem>
            <ListItem
              button
              component={React.forwardRef((props, ref) => (
                <RouterLink innerRef={ref} to="/signup" {...props} />
              ))}
            >
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText>
                {localeSelect(props.language, signup)}
              </ListItemText>
            </ListItem>
          </>
        )}
        {props.user && (
          <>
            <ListItem
              button
              component={React.forwardRef((props, ref) => (
                <RouterLink innerRef={ref} to="/" {...props} />
              ))}
            >
              <ListItemIcon>
                <Gamepad />
              </ListItemIcon>
              <ListItemText>
                {localeSelect(props.language, gameNotes)}
              </ListItemText>
            </ListItem>
            <ListItem
              button
              component={React.forwardRef((props, ref) => (
                <RouterLink innerRef={ref} to="/player" {...props} />
              ))}
            >
              <ListItemIcon>
                <Face />
              </ListItemIcon>
              <ListItemText>
                {localeSelect(props.language, playerNotes)}
              </ListItemText>
            </ListItem>
            {props.role === "Admin" && (
              <>
                <ListItem
                  button
                  component={React.forwardRef((props, ref) => (
                    <RouterLink innerRef={ref} to="/add-game" {...props} />
                  ))}
                >
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText>
                    {localeSelect(props.language, addGame)}
                  </ListItemText>
                </ListItem>
                <ListItem
                  button
                  component={React.forwardRef((props, ref) => (
                    <RouterLink innerRef={ref} to="/add-character" {...props} />
                  ))}
                >
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText>
                    {localeSelect(props.language, addCharacter)}
                  </ListItemText>
                </ListItem>
                <ListItem
                  button
                  component={React.forwardRef((props, ref) => (
                    <RouterLink innerRef={ref} to="/add-filter" {...props} />
                  ))}
                >
                  <ListItemIcon>
                    <Add />
                  </ListItemIcon>
                  <ListItemText>
                    {localeSelect(props.language, addFilter)}
                  </ListItemText>
                </ListItem>
                <ListItem
                  button
                  component={React.forwardRef((props, ref) => (
                    <RouterLink innerRef={ref} to="/edit-game" {...props} />
                  ))}
                >
                  <ListItemIcon>
                    <Edit />
                  </ListItemIcon>
                  <ListItemText>
                    {localeSelect(props.language, editGame)}
                  </ListItemText>
                </ListItem>
                <ListItem
                  button
                  component={React.forwardRef((props, ref) => (
                    <RouterLink
                      innerRef={ref}
                      to="/edit-character"
                      {...props}
                    />
                  ))}
                >
                  <ListItemIcon>
                    <Edit />
                  </ListItemIcon>
                  <ListItemText>
                    {localeSelect(props.language, editCharacter)}
                  </ListItemText>
                </ListItem>
                <ListItem
                  button
                  component={React.forwardRef((props, ref) => (
                    <RouterLink innerRef={ref} to="/edit-filter" {...props} />
                  ))}
                >
                  <ListItemIcon>
                    <Edit />
                  </ListItemIcon>
                  <ListItemText>
                    {localeSelect(props.language, editFilter)}
                  </ListItemText>
                </ListItem>
                <ListItem
                  button
                  component={React.forwardRef((props, ref) => (
                    <RouterLink
                      innerRef={ref}
                      to="/link-character"
                      {...props}
                    />
                  ))}
                >
                  <ListItemIcon>
                    <LinkIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {localeSelect(props.language, linkCharacters)}
                  </ListItemText>
                </ListItem>
                <ListItem
                  button
                  component={React.forwardRef((props, ref) => (
                    <RouterLink innerRef={ref} to="/link-filter" {...props} />
                  ))}
                >
                  <ListItemIcon>
                    <LinkIcon />
                  </ListItemIcon>
                  <ListItemText>
                    {localeSelect(props.language, linkFilters)}
                  </ListItemText>
                </ListItem>
                <ListItem
                  button
                  component={React.forwardRef((props, ref) => (
                    <RouterLink innerRef={ref} to="/user-settings" {...props} />
                  ))}
                >
                  <ListItemIcon>
                    <Settings />
                  </ListItemIcon>
                  <ListItemText>
                    {localeSelect(props.language, userSettings)}
                  </ListItemText>
                </ListItem>
              </>
            )}
            <ListItem
              button
              component={React.forwardRef((props, ref) => (
                <RouterLink innerRef={ref} to="/profile" {...props} />
              ))}
            >
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText>
                {localeSelect(props.language, profile)}
              </ListItemText>
            </ListItem>
            <ListItem button onClick={props.logout}>
              <ListItemText>
                {localeSelect(props.language, logout)}
              </ListItemText>
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );
}
