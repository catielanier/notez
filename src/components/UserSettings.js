import React, { useContext, useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import {
	Container,
	Button,
	Typography,
	Radio,
	RadioGroup,
	FormControlLabel,
} from "@material-ui/core";
import { Redirect } from "react-router-dom";
import { getToken } from "../services/tokenService";
import { UserContext } from "../contexts/UserContext";
import { useTranslation } from "react-i18next";

export default function UserSettings() {
	const t = useTranslation();
	const { user, loading, success, error, updateRole } = useContext(UserContext);
	const [users, setUsers] = useState([]);
	const [selectedUser, setSelectedUser] = useState("");
	const [role, setRole] = useState("");
	useEffect(() => {
		const token = getToken();
		async function fetchData() {
			await axios
				.get("/api/users", {
					params: {
						token,
						user,
					},
				})
				.then((res) => {
					setUsers(res.data.data);
				});
		}
		fetchData();
	}, [user]);
	if (!user) {
		return <Redirect to="/" />;
	}
	return (
		<section>
			<Container maxWidth="sm">
				<Typography variant="h5" gutterBottom>
					{t("settings.user.role.edit")}
				</Typography>
				<Typography variant="h6">{t("settings.user.select")}</Typography>
				<Select
					options={users.map((user) => {
						return {
							label: `${user.username} (${user.realName} - ${user.country})`,
							value: user._id,
						};
					})}
					onChange={(e) => {
						setSelectedUser(e.value);
						const index = users.findIndex((x) => x._id === e.value);
						setRole(users[index].role);
					}}
				/>
				{selectedUser !== "" && role !== "" && (
					<>
						<Typography variant="h6">
							{t("settings.user.role.assign")}
						</Typography>
						<RadioGroup
							onChange={(e) => {
								setRole(e.target.value);
							}}
							value={role}
						>
							<FormControlLabel
								value="User"
								control={<Radio color="primary" />}
								label={t("settings.user.role.user")}
							/>
							<FormControlLabel
								value="Admin"
								control={<Radio color="primary" />}
								label={t("settings.user.role.admin")}
							/>
							<FormControlLabel
								value="Banned"
								control={<Radio color="primary" />}
								label={t("settings.user.role.banned")}
							/>
						</RadioGroup>
						<Button
							color="primary"
							variant="contained"
							onClick={(e) => {
								e.preventDefault();
								updateRole(selectedUser, role);
							}}
						>
							{t("settings.user.update")}
						</Button>
					</>
				)}
			</Container>
		</section>
	);
}
