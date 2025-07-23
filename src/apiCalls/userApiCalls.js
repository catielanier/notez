import api from "../utils/httpClient";

// 1️⃣ Sign up
export function signup({ email, username, password, realName, country }) {
	return api
		.post("/users/signup", {
			data: { email, username, password, realName, country },
		})
		.then((res) => res.data.data[0]);
}

// 2️⃣ Log in
export function login({ email, password }) {
	return api
		.post("/users/login", { data: { email, password } })
		.then((res) => res.data.data); // { token }
}

// 3️⃣ Fetch current user (requires Bearer token)
export function fetchCurrentUser() {
	return api.get("/users/current").then((res) => res.data.data);
}

// 4️⃣ Fetch profile by ID
export function fetchUserById(id) {
	return api.get(`/users/${id}`).then((res) => res.data.data);
}

// 5️⃣ Init / token‑check
export function init() {
	return api.get("/users/init").then((res) => res.data);
}

// 6️⃣ Update profile
export function updateProfile(id, payload) {
	return api.put(`/users/${id}`, payload).then((res) => res.data.data);
}

// 7️⃣ Update role
export function updateRole({ id, role }) {
	return api.put("/users/role", { id, role }).then((res) => res.data.data);
}

// 8️⃣ List all users (admin only)
export function fetchAllUsers({ user: userId, token }) {
	return api
		.get("/users", { params: { user: userId, token } })
		.then((res) => res.data.data);
}

// 9️⃣ Forgot‑password request
export function requestPasswordReset(email) {
	return api.post("/users/forgot", { email }).then((res) => res.data.data);
}

// 🔟 Verify account
export function verifyAccount(key) {
	return api.post("/users/verify", { key }).then((res) => res.data.data);
}

// 1️⃣1️⃣ Reset password
export function resetPassword({ key, password }) {
	return api
		.post("/users/reset", { key, password })
		.then((res) => res.data.data);
}

// logout (client only)
export function logout() {
	localStorage.removeItem("notezToken");
	delete api.defaults.headers.common["Authorization"];
}
