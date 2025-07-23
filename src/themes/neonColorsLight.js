import { createTheme } from "@mui/material/styles";

const neonColorsLightPalette = {
	primary: {
		main: "#ff0066", // Neon pink
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
		main: "#ff9900", // Vibrant orange-yellow
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
		primary: "#000000", // Black text
		secondary: "#555555", // Dark gray text
		disabled: "#888888", // Light gray text
	},
	background: {
		paper: "#ffffff", // White paper
		default: "#f0f0f0", // Light gray background
	},
};

const neonColorsLight = createTheme({
	palette: neonColorsLightPalette,
});

export default neonColorsLight;
