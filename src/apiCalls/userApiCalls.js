import api from "../utils/httpClient";

// 1️⃣ Sign up
// POST /api/users/signup  body: { data:{ email, username, password, realName, country } }
export function signup({ email, username, password, realName, country }) {
	return api
		.post("/users/signup", {
			data: { email, username, password, realName, country },
		})
		.then((res) => res.data.data[0]);
}

// 2️⃣ Log in
// POST /api/users/login  body: { data:{ email, password } }
export function login({ email, password }) {
	return api
		.post("/users/login", { data: { email, password } })
		.then((res) => res.data.data); // { token }
}

// 3️⃣ Fetch profile by ID
// GET /api/users/:id     (requires Bearer token)
export function fetchUserById(id) {
	return api.get(`/users/${id}`).then((res) => res.data.data);
}

// 4️⃣ Init / token‑check
// GET /api/users/init    (requires Bearer token)
export function init() {
	return api.get("/users/init").then((res) => res.data);
}

// 5️⃣ Update profile
// PUT /api/users/:id     body: { username, realName, newPassword?, oldPassword?, country, email, token }
export function updateProfile(id, payload) {
	return api.put(`/users/${id}`, payload).then((res) => res.data.data);
}

// 6️⃣ Update role
// PUT /api/users/role    body: { token, user, id, role }
export function updateRole({ id, role }) {
	return api.put("/users/role", { id, role }).then((res) => res.data.data);
}

// 7️⃣ List all users (admin only)
// GET /api/users?token=…&user=…
export function fetchAllUsers({ user: userId, token }) {
	return api
		.get("/users", { params: { user: userId, token } })
		.then((res) => res.data.data);
}

// 8️⃣ Forgot‑password request
// POST /api/users/forgot  body:{ email }
export function requestPasswordReset(email) {
	return api.post("/users/forgot", { email }).then((res) => res.data.data);
}

// 9️⃣ Verify account
// POST /api/users/verify  body:{ key }
export function verifyAccount(key) {
	return api.post("/users/verify", { key }).then((res) => res.data.data);
}

// 🔟 Reset password
// POST /api/users/reset   body:{ key, password }
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
