// src/api/userService.js
import api from "../utils/httpClient";

// read current user (JWT→ /me or /users/me)
export function fetchCurrentUser() {
	return api.get("/api/users/me").then((res) => res.data.data);
}

// login (returns { token, id })
export function login({ email, password }) {
	return api
		.post("/api/users/login", { data: { email, password } })
		.then((res) => res.data.data);
}

// signup
export function signup({ email, username, password, realName, country }) {
	return api
		.post("/api/users/signup", {
			data: { email, username, password, realName, country },
		})
		.then((res) => res.data.data);
}

// update role
export function updateRole({ id, role }) {
	return api
		.put("/api/users/role", { data: { id, role } })
		.then((res) => res.data.data);
}

// update profile
export function updateProfile(payload) {
	// payload = { email, username, realName, country, oldPassword?, newPassword? }
	return api
		.put("/api/users/me", { data: payload })
		.then((res) => res.data.data);
}

// request password reset
export function requestReset({ email }) {
	return api.post("/api/users/forgot", { email }).then((res) => res.data.data);
}

// perform reset
export function resetPassword({ key, password }) {
	return api
		.post("/api/users/reset", { key, password })
		.then((res) => res.data.data);
}

// logout (client‑only)
export function logout() {
	localStorage.removeItem("notezToken");
	delete api.defaults.headers.Authorization;
}
