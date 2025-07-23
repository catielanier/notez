import { createTheme } from "@mui/material/styles";

const neonColorsDarkPalette = {
	primary: {
		main: "#ff00cc", // Hot pink
		contrastText: "#ffffff",
	},
	secondary: {
		main: "#00ff99", // Electric green
		contrastText: "#000000",
	},
	error: {
		main: "#ff3300", // Intense orange-red
		contrastText: "#ffffff",
	},
	warning: {
		main: "#ffcc00", // Bright yellow
		contrastText: "#000000",
	},
	info: {
		main: "#3399ff", // Sky blue
		contrastText: "#ffffff",
	},
	success: {
		main: "#00ffcc", // Turquoise
		contrastText: "#000000",
	},
	text: {
		primary: "#ffffff", // White text
		secondary: "#c0c0c0", // Silver text
		disabled: "#808080", // Grayish text
	},
	background: {
		paper: "#000000", // Black paper
		default: "#141414", // Dark gray background
	},
};

const neonColorsDark = createTheme({
	palette: neonColorsDarkPalette,
});

export default neonColorsDark;
