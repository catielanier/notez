import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { ExitToApp, PersonAdd, Face, Gamepad } from "@material-ui/icons";

export default function MobileMenu(props) {
  return (
    <Drawer open={props.menu} onClose={props.showMenu}>
      <List>
        {!props.user && (
          <>
            <ListItem button>
              <ListItemIcon>
                <ExitToApp />
              </ListItemIcon>
              <ListItemText>Login</ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText>Signup</ListItemText>
            </ListItem>
          </>
        )}
        {props.user && (
          <>
            <ListItem button>
              <ListItemIcon>
                <Gamepad />
              </ListItemIcon>
              <ListItemText>Game Notes</ListItemText>
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <Face />
              </ListItemIcon>
              <ListItemText>Player Notes</ListItemText>
            </ListItem>
            {props.role === "Admin" && (
              <>
                <ListItem button>
                  <ListItemText>Add Game</ListItemText>
                </ListItem>
                <ListItem button>
                  <ListItemText>Add Character</ListItemText>
                </ListItem>
                <ListItem button>
                  <ListItemText>Add Filter</ListItemText>
                </ListItem>
                <ListItem button>
                  <ListItemText>Link Characters</ListItemText>
                </ListItem>
                <ListItem button>
                  <ListItemText>Link Filters</ListItemText>
                </ListItem>
                <ListItem button>
                  <ListItemText>User Settings</ListItemText>
                </ListItem>
              </>
            )}
            <ListItem button>
              <ListItemText>Logout</ListItemText>
            </ListItem>
          </>
        )}
      </List>
    </Drawer>
  );
}
