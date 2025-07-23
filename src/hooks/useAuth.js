import React, { useState, useEffect } from "react";
import {
	Container,
	Typography,
	CircularProgress,
	Button,
	RadioGroup,
	FormControlLabel,
	Radio,
} from "@mui/material";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import useAuth from "../hooks/useAuth";

export default function UserSettings() {
	const { t } = useTranslation();
	const {
		user,
		userLoading,
		userError,
		fetchAllUsers,
		fetchAllUsersLoading,
		fetchAllUsersError,
		updateRole,
		updateRoleLoading,
		updateRoleError,
	} = useAuth();

	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState(null);
	const [role, setRole] = useState("");

	// Load all users once we're sure the current user is an admin
	useEffect(() => {
		if (user?.role !== "Admin") return;
		fetchAllUsers(undefined, {
			onSuccess: (data) => setUsers(data),
		});
	}, [user, fetchAllUsers]);

	// Authentication & authorization guards
	if (userLoading) return <CircularProgress />;
	if (userError)
		return <Typography color="error">{userError.message}</Typography>;
	if (!user || user.role !== "Admin") {
		return (
			<Typography color="error">
				{t("errors.unauthorizedRoleUpdate")}
			</Typography>
		);
	}

	// Loading / error for users list
	if (fetchAllUsersLoading) return <CircularProgress />;
	if (fetchAllUsersError)
		return <Typography color="error">{fetchAllUsersError.message}</Typography>;

	return (
		<Container maxWidth="sm">
			<Typography variant="h5" gutterBottom>
				{t("settings.user.role.edit")}
			</Typography>

			{updateRoleError && (
				<Typography color="error" gutterBottom>
					{updateRoleError.message}
				</Typography>
			)}
			{updateRoleLoading && <CircularProgress size={24} />}

			<Typography variant="h6">{t("settings.user.select")}</Typography>
			<Select
				options={users.map((u) => ({
					label: `${u.username} (${u.realName} – ${u.country})`,
					value: u._id,
				}))}
				value={
					selectedUser
						? { label: selectedUser.username, value: selectedUser._id }
						: null
				}
				onChange={(opt) => {
					const u = users.find((u) => u._id === opt.value);
					setSelectedUser(u);
					setRole(u.role);
				}}
				placeholder={t("settings.user.selectPlaceholder")}
				styles={{ menu: (base) => ({ ...base, zIndex: 9999 }) }}
			/>

			{selectedUser && (
				<>
					<Typography variant="h6" sx={{ mt: 2 }}>
						{t("settings.user.role.assign")}
					</Typography>
					<RadioGroup
						row
						value={role}
						onChange={(e) => setRole(e.target.value)}
					>
						<FormControlLabel
							value="User"
							control={<Radio />}
							label={t("settings.user.role.user")}
						/>
						<FormControlLabel
							value="Admin"
							control={<Radio />}
							label={t("settings.user.role.admin")}
						/>
						<FormControlLabel
							value="Banned"
							control={<Radio />}
							label={t("settings.user.role.banned")}
						/>
					</RadioGroup>

					<Button
						variant="contained"
						color="primary"
						onClick={() => updateRole({ id: selectedUser._id, role })}
						disabled={updateRoleLoading}
						sx={{ mt: 2 }}
					>
						{t("settings.user.update")}
					</Button>
				</>
			)}
		</Container>
	);
}
