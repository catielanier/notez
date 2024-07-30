import React, { useContext } from "react";
import {
	Drawer,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
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
	Edit,
} from "@material-ui/icons";
import { UserContext } from "../contexts/UserContext";
import { MenuContext } from "../contexts/MenuContext";
import { useTranslation } from "react-i18next";

export default function MobileMenu() {
	const { t } = useTranslation();
	const { user, role, logout: doLogout } = useContext(UserContext);
	const { menu, showMenu } = useContext(MenuContext);
	return (
		<Drawer anchor="right" open={menu} onClose={showMenu}>
			<List>
				{user === undefined && (
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
							<ListItemText>{t("header.login")}</ListItemText>
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
							<ListItemText>{t("header.signup")}</ListItemText>
						</ListItem>
					</>
				)}
				{user !== undefined && (
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
							<ListItemText>{t("header.notes.game")}</ListItemText>
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
							<ListItemText>{t("header.notes.player")}</ListItemText>
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
									<ListItemText>{t("header.game.add")}</ListItemText>
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
									<ListItemText>{t("header.character.add")}</ListItemText>
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
									<ListItemText>{t("header.filter.add")}</ListItemText>
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
									<ListItemText>{t("header.game.edit")}</ListItemText>
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
									<ListItemText>{t("header.character.edit")}</ListItemText>
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
									<ListItemText>{t("header.filter.edit")}</ListItemText>
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
									<ListItemText>{t("header.character.link")}</ListItemText>
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
									<ListItemText>{t("header.filter.link")}</ListItemText>
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
									<ListItemText>{t("header.user.settings")}</ListItemText>
								</ListItem>
								<ListItem
									button
									component={React.forwardRef((props, ref) => (
										<RouterLink innerRef={ref} to="/invite" {...props} />
									))}
								>
									<ListItemIcon>
										<Settings />
									</ListItemIcon>
									<ListItemText>{t("header.user.invite")}</ListItemText>
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
							<ListItemText>{t("header.profile")}</ListItemText>
						</ListItem>
						<ListItem button onClick={doLogout}>
							<ListItemText>{t("header.logout")}</ListItemText>
						</ListItem>
					</>
				)}
			</List>
		</Drawer>
	);
}
