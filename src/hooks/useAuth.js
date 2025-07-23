import { useState, useEffect } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as userSvc from "../apiCalls/userApiCalls";
import * as tokenService from "../utils/tokenService";

export default function useAuth() {
	const qc = useQueryClient();

	// 1️⃣ Attempt token‑validation on mount
	const initToken = tokenService.getToken();
	const [userId, setUserId] = useState(
		initToken ? tokenService.decodeToken(initToken).userId : null,
	);

	// 2️⃣ Fetch current user profile when we have an ID
	const {
		data: user,
		isLoading: userLoading,
		error: userError,
	} = useQuery(["user", userId], () => userSvc.fetchUserById(userId), {
		enabled: Boolean(userId),
	});

	// 3️⃣ Login mutation
	const loginMut = useMutation(userSvc.login, {
		onSuccess: ({ token }) => {
			tokenService.setToken(token);
			const { userId: id } = tokenService.decodeToken(token);
			setUserId(id);
			qc.invalidateQueries(["user"]);
		},
	});

	// 4️⃣ Signup mutation
	const signupMut = useMutation(userSvc.signup, {
		onSuccess: (newUser) => {
			// optional: auto‑login after signup?
			qc.invalidateQueries(["user"]);
		},
	});

	// 5️⃣ Update profile mutation
	const updateProfileMut = useMutation(
		(payload) => userSvc.updateProfile(userId, payload),
		{ onSuccess: () => qc.invalidateQueries(["user"]) },
	);

	// 6️⃣ Update role
	const updateRoleMut = useMutation((payload) => userSvc.updateRole(payload), {
		onSuccess: () => qc.invalidateQueries(["user"]),
	});

	// 7️⃣ Fetch all users (admin)
	const fetchAllUsersMut = useMutation(userSvc.fetchAllUsers);

	// 8️⃣ Request password reset
	const requestResetMut = useMutation(userSvc.requestPasswordReset);

	// 9️⃣ Verify account
	const verifyMut = useMutation(userSvc.verifyAccount);

	// 🔟 Reset password
	const resetMut = useMutation(userSvc.resetPassword);

	// logout fn
	const doLogout = () => {
		userSvc.logout();
		setUserId(null);
		qc.setQueryData(["user"], null);
	};

	return {
		// 🎯 user state
		user,
		userLoading,
		userError,

		// 🔐 auth actions
		login: loginMut.mutate,
		loginLoading: loginMut.isLoading,
		loginError: loginMut.error,

		signup: signupMut.mutate,
		signupLoading: signupMut.isLoading,
		signupError: signupMut.error,

		updateProfile: updateProfileMut.mutate,
		updateProfileLoading: updateProfileMut.isLoading,
		updateProfileError: updateProfileMut.error,

		updateRole: updateRoleMut.mutate,
		updateRoleLoading: updateRoleMut.isLoading,
		updateRoleError: updateRoleMut.error,

		fetchAllUsers: fetchAllUsersMut.mutate,
		fetchAllUsersLoading: fetchAllUsersMut.isLoading,
		fetchAllUsersError: fetchAllUsersMut.error,

		requestReset: requestResetMut.mutate,
		requestResetLoading: requestResetMut.isLoading,
		requestResetError: requestResetMut.error,

		verifyAccount: verifyMut.mutate,
		verifyLoading: verifyMut.isLoading,
		verifyError: verifyMut.error,

		resetPassword: resetMut.mutate,
		resetPasswordLoading: resetMut.isLoading,
		resetPasswordError: resetMut.error,

		logout: doLogout,
	};
}
