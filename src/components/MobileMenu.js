import React from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { ExitToApp, PersonAdd } from "@material-ui/icons";

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
      </List>
    </Drawer>
  );
}
