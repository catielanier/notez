import React, { useContext } from "react";
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
import { UserContext } from "../contexts/UserContext";
import { LanguageContext } from "../contexts/LanguageContext";
import { MenuContext } from "../contexts/MenuContext";

export default function MobileMenu(props) {
  const { user, role, logout: doLogout } = useContext(UserContext);
  const { language } = useContext(LanguageContext);
  const { menu, showMenu } = useContext(MenuContext);
  return (
    <Drawer open={menu} onClose={showMenu}>
      <List>
        {!user && (
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
              <ListItemText>{localeSelect(language, login)}</ListItemText>
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
              <ListItemText>{localeSelect(language, signup)}</ListItemText>
            </ListItem>
          </>
        )}
        {user && (
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
              <ListItemText>{localeSelect(language, gameNotes)}</ListItemText>
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
              <ListItemText>{localeSelect(language, playerNotes)}</ListItemText>
            </ListItem>
            {role === "Admin" && (
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
                  <ListItemText>{localeSelect(language, addGame)}</ListItemText>
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
                    {localeSelect(language, addCharacter)}
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
                    {localeSelect(language, addFilter)}
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
                    {localeSelect(language, editGame)}
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
                    {localeSelect(language, editCharacter)}
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
                    {localeSelect(language, editFilter)}
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
                    {localeSelect(language, linkCharacters)}
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
                    {localeSelect(language, linkFilters)}
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
                    {localeSelect(language, userSettings)}
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
              <ListItemText>{localeSelect(language, profile)}</ListItemText>
            </ListItem>
            <ListItem button onClick={doLogout}>
              <ListItemText>{localeSelect(language, logout)}</ListItemText>
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );
}
