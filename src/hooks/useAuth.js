import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import * as svc from "../apiCalls/userApiCalls";

export default function useAuth() {
	const qc = useQueryClient();

	const {
		data: user,
		isLoading: userLoading,
		error: userError,
	} = useQuery(["currentUser"], svc.fetchCurrentUser, {
		retry: false,
		onError: () => {
			// if 401, we clear token
			svc.logout();
			qc.setQueryData(["currentUser"], null);
		},
	});

	const loginMut = useMutation(svc.login, {
		onSuccess: ({ token, id }) => {
			localStorage.setItem("notezToken", token);
			svc.logout(); // clear old header
			svc.login({ token }); // set new header via httpClient interceptor
			qc.invalidateQueries(["currentUser"]);
		},
	});

	const signupMut = useMutation(svc.signup, {
		onSuccess: () => qc.invalidateQueries(["currentUser"]),
	});

	const updateRoleMut = useMutation(svc.updateRole, {
		onSuccess: () => qc.invalidateQueries(["currentUser"]),
	});

	const updateProfileMut = useMutation(svc.updateProfile, {
		onSuccess: () => qc.invalidateQueries(["currentUser"]),
	});

	const requestResetMut = useMutation(svc.requestReset);

	const resetPasswordMut = useMutation(svc.resetPassword);

	const doLogout = () => {
		svc.logout();
		qc.setQueryData(["currentUser"], null);
	};

	return {
		// user state
		user,
		userLoading,
		userError,

		// login
		login: loginMut.mutate,
		loginLoading: loginMut.isLoading,
		loginError: loginMut.error,

		// signup
		signup: signupMut.mutate,
		signupLoading: signupMut.isLoading,
		signupError: signupMut.error,

		// updateRole
		updateRole: updateRoleMut.mutate,
		updateRoleLoading: updateRoleMut.isLoading,
		updateRoleError: updateRoleMut.error,

		// updateProfile
		updateProfile: updateProfileMut.mutate,
		updateProfileLoading: updateProfileMut.isLoading,
		updateProfileError: updateProfileMut.error,

		// password reset flows
		requestReset: requestResetMut.mutate,
		requestResetLoading: requestResetMut.isLoading,
		requestResetError: requestResetMut.error,

		resetPassword: resetPasswordMut.mutate,
		resetPasswordLoading: resetPasswordMut.isLoading,
		resetPasswordError: resetPasswordMut.error,

		// logout
		logout: doLogout,
	};
}
