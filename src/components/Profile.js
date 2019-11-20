import React from "react";
import axios from "axios";

class Profile extends React.Component {
  state = {
    oldPassword: "",
    newPassword: "",
    verifyNewPassword: "",
    username: "",
    country: "",
    email: "",
    realName: ""
  };

  async componentWillMount() {
    const { user } = this.props;
    await axios.get(`/api/users/${user}`).then(res => {
      const { username, country, email, realName } = res.data.data;
      this.setState({
        username,
        country,
        email,
        realName
      });
    });
  }

  render() {
    return (
      <section>
        <h1>Profile</h1>
      </section>
    )
  }
}

export default Profile;
