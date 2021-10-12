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
	Hidden,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
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
	const { t } = useTranslation();
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const { user, role, logout: doLogout } = useContext(UserContext);
	const { showMenu, showSearchBar } = useContext(MenuContext);
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
						{t("app.name")}
					</Typography>
					{user === null && (
						<Hidden xsDown>
							<Button
								component={React.forwardRef((props, ref) => (
									<RouterLink innerRef={ref} to="/login" {...props} />
								))}
								color="inherit"
							>
								{t("header.login")}
							</Button>
							<Button
								component={React.forwardRef((props, ref) => (
									<RouterLink innerRef={ref} to="/signup" {...props} />
								))}
								color="inherit"
							>
								{t("header.signup")}
							</Button>
						</Hidden>
					)}
					{user !== null && (
						<Hidden xsDown>
							<Button
								component={React.forwardRef((props, ref) => (
									<RouterLink innerRef={ref} to="/" {...props} />
								))}
								color="inherit"
							>
								{t("header.notes.game")}
							</Button>
							<Button
								component={React.forwardRef((props, ref) => (
									<RouterLink innerRef={ref} to="/player" {...props} />
								))}
								color="inherit"
							>
								{t("header.notes.player")}
							</Button>
							{role === "Admin" && (
								<>
									<Button onClick={handleClick} color="inherit">
										{t("header.settings")}
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
												{t("header.game.add")}
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
												{t("header.character.add")}
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
												{t("header.filter.add")}
											</MenuItem>
										</Link>
										<Link
											component={React.forwardRef((props, ref) => (
												<RouterLink innerRef={ref} to="/edit-game" {...props} />
											))}
										>
											<MenuItem onClick={handleClose}>
												{t("header.game.edit")}
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
												{t("header.character.edit")}
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
												{t("header.filter.edit")}
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
												{t("header.character.link")}
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
												{t("header.filter.link")}
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
												{t("header.user.settings")}
											</MenuItem>
										</Link>
										<Link
											component={React.forwardRef((props, ref) => (
												<RouterLink innerRef={ref} to="/invite" {...props} />
											))}
										>
											<MenuItem onClick={handleClose}>
												{t("header.user.invite")}
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
								{t("header.profile")}
							</Button>
							<Button color="inherit" onClick={doLogout}>
								{t("header.logout")}
							</Button>
						</Hidden>
					)}
					{user !== null && (
						<Hidden smUp>
							<IconButton
								edge="start"
								color="inherit"
								aria-label="menu"
								className={classes.searchButton}
								onClick={showSearchBar}
							>
								<SearchIcon />
							</IconButton>
						</Hidden>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}
