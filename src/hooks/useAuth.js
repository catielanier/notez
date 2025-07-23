import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as userSvc from "../apiCalls/userApiCalls";
import * as tokenService from "../services/tokenService";

export default function useAuth() {
	const qc = useQueryClient();

	// Logout helper
	const logout = () => {
		userSvc.logout();
		qc.setQueryData(["authInit"], {});
		qc.setQueryData(["userProfile"], null);
		qc.setQueryData(["allUsers"], []);
	};

	// 1️⃣ Validate token & refresh via backend; on any error, force logout
	const {
		data: initData = {},
		isLoading: initLoading,
		error: initError,
	} = useQuery(["authInit"], () => userSvc.init(), {
		retry: false,
		onError: () => logout(),
	});

	// If backend returned a refreshed token, store it
	if (initData.token) {
		tokenService.setToken(initData.token);
		qc.invalidateQueries(["authInit"]);
	}

	// 2️⃣ Fetch current user when backend says we're logged in; on error, logout
	const {
		data: user,
		isLoading: userLoading,
		error: userError,
	} = useQuery(["userProfile"], () => userSvc.fetchCurrentUser(), {
		enabled: initData.isLoggedIn === true,
		onError: () => logout(),
	});

	// 3️⃣ Login
	const loginMut = useMutation(userSvc.login, {
		onSuccess: ({ token }) => {
			tokenService.setToken(token);
			qc.invalidateQueries(["authInit", "userProfile", "allUsers"]);
		},
		onError: () => logout(),
	});

	// 4️⃣ Signup
	const signupMut = useMutation(userSvc.signup, {
		onSuccess: ({ token }) => {
			tokenService.setToken(token);
			qc.invalidateQueries(["authInit", "userProfile", "allUsers"]);
		},
		onError: () => logout(),
	});

	// 5️⃣ Update own profile
	const updateProfileMut = useMutation(userSvc.updateProfile, {
		onSuccess: () => qc.invalidateQueries(["userProfile"]),
		onError: () => logout(),
	});

	// 6️⃣ Update another user’s role
	const updateRoleMut = useMutation(userSvc.updateRole, {
		onSuccess: () => qc.invalidateQueries(["allUsers"]),
		onError: () => logout(),
	});

	// 7️⃣ Fetch all users (admin)
	const {
		data: allUsers,
		isLoading: allUsersLoading,
		error: allUsersError,
	} = useQuery(["allUsers"], () => userSvc.fetchAllUsers(), {
		enabled: user?.role === "Admin",
		onError: () => logout(),
	});

	// 8️⃣ Request password reset
	const requestResetMut = useMutation(userSvc.requestPasswordReset, {
		onError: () => logout(),
	});

	// 9️⃣ Verify account
	const verifyMut = useMutation(userSvc.verifyAccount, {
		onError: () => logout(),
	});

	// 🔟 Reset password
	const resetMut = useMutation(userSvc.resetPassword, {
		onError: () => logout(),
	});

	return {
		// initialization state
		initLoading,
		initError,

		// user profile
		user,
		userLoading,
		userError,

		// login/signup
		login: loginMut.mutate,
		loginLoading: loginMut.isLoading,
		loginError: loginMut.error,

		signup: signupMut.mutate,
		signupLoading: signupMut.isLoading,
		signupError: signupMut.error,

		// profile update
		updateProfile: updateProfileMut.mutate,
		updateProfileLoading: updateProfileMut.isLoading,
		updateProfileError: updateProfileMut.error,

		// admin role update
		updateRole: updateRoleMut.mutate,
		updateRoleLoading: updateRoleMut.isLoading,
		updateRoleError: updateRoleMut.error,

		// all users list
		allUsers,
		allUsersLoading,
		allUsersError,

		// password flows
		requestReset: requestResetMut.mutate,
		requestResetLoading: requestResetMut.isLoading,
		requestResetError: requestResetMut.error,

		verifyAccount: verifyMut.mutate,
		verifyLoading: verifyMut.isLoading,
		verifyError: verifyMut.error,

		resetPassword: resetMut.mutate,
		resetPasswordLoading: resetMut.isLoading,
		resetPasswordError: resetMut.error,

		// logout
		logout,
	};
}
