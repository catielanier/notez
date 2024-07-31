import React from "react";
import { redirect } from "react-router-dom";
import axios from "axios";

class VerifyUser extends React.Component {
	state = {
		success: false,
		error: null,
	};
	async componentWillMount() {
		const key = window.location.pathname.replace("/verify/", "");
		await axios
			.post("/api/users/verify", { key })
			.then((_) => {
				this.setState({
					success: true,
				});
			})
			.catch((error) => {
				this.setState({
					error,
				});
			});
	}
	render() {
		if (this.state.success) {
			if (this.state.success) {
				return redirect('/');
			}
		} else {
			return <section>Error: No Valid token.</section>;
		}
	}
}

export default VerifyUser;
