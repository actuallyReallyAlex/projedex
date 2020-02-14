import React, { useState } from "react";
import PropTypes from "prop-types";
import { Segment, Header, Form, Input, Button } from "semantic-ui-react";
import { connect } from "react-redux";
import moment from "moment";
import { modifyUser, logoutAll } from "../redux/actions/user";
import { setLoading } from "../redux/actions/app";

const Settings = ({
  handleLogOutAll,
  handleUpdateProfile,
  loading,
  userData
}) => {
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [name, setName] = useState(userData.user.name);
  const [email, setEmail] = useState(userData.user.email);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleUpdate = () => {
    const modification = { name, email };

    Object.keys(modification).forEach(field => {
      const currentValue = modification[field];
      const storedValue = userData.user[field];

      if (currentValue === storedValue) delete modification[field];
    });

    handleUpdateProfile(modification);
  };

  const handleChangePassword = () => {
    // TODO - Actual validation / checks here
    handleUpdateProfile({ password: confirmNewPassword });
  };

  return (
    <div>
      <Header as="h2">Settings</Header>
      <Segment raised color="green">
        <Header as="h3">Profile</Header>
        {!isChangingPassword && (
          <Form loading={loading} onSubmit={handleUpdate}>
            <Form.Field
              control={Input}
              label="Name"
              onChange={e => setName(e.target.value)}
              value={name}
              width="4"
            />
            <Form.Field
              control={Input}
              label="Email"
              onChange={e => setEmail(e.target.value)}
              value={email}
              width="6"
            />
            <Button onClick={() => setIsChangingPassword(true)} type="button">
              Change password
            </Button>
            <div
              style={{
                alignItems: "flex-start",
                display: "flex",
                flexDirection: "column"
              }}
            >
              <Button
                disabled={
                  name === userData.user.name && email === userData.user.email
                }
                primary
                style={{ marginBottom: "14px", marginTop: "14px" }}
                type="submit"
              >
                Update profile
              </Button>
              <span>
                Projedex member since{" "}
                {moment(userData.user.createdAt).format("MMMM Do, YYYY")}
              </span>
            </div>
          </Form>
        )}
        {isChangingPassword && (
          <Form loading={loading} onSubmit={handleChangePassword}>
            <Form.Field
              control={Input}
              label="Old password"
              onChange={e => setOldPassword(e.target.value)}
              type="password"
              value={oldPassword}
              width="6"
            />
            <Form.Field
              control={Input}
              label="New password"
              onChange={e => setNewPassword(e.target.value)}
              type="password"
              value={newPassword}
              width="6"
            />
            <Form.Field
              control={Input}
              label="Confirm new password"
              onChange={e => setConfirmNewPassword(e.target.value)}
              type="password"
              value={confirmNewPassword}
              width="6"
            />
            <div style={{ display: "flex" }}>
              <Button
                disabled={
                  !oldPassword ||
                  !newPassword ||
                  !confirmNewPassword ||
                  newPassword !== confirmNewPassword ||
                  oldPassword === newPassword
                }
                primary
                type="submit"
              >
                Update password
              </Button>
              <Button
                secondary
                onClick={() => setIsChangingPassword(false)}
                type="button"
              >
                Cancel
              </Button>
            </div>
          </Form>
        )}
      </Segment>
      <Segment raised color="red">
        <Header as="h3">Log out</Header>
        <Button negative onClick={handleLogOutAll} type="button">
          Log out of all devices
        </Button>
      </Segment>
    </div>
  );
};

Settings.propTypes = {
  handleLogOutAll: PropTypes.func.isRequired,
  handleUpdateProfile: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  userData: PropTypes.object.isRequired
};

const mapStateToProps = ({ app, user }) => ({
  loading: app.loading,
  userData: user.userData
});

const mapDispatchToProps = dispatch => ({
  handleLogOutAll: () => {
    dispatch(setLoading(true));
    dispatch(logoutAll());
  },
  handleUpdateProfile: modification => {
    dispatch(setLoading(true));
    dispatch(modifyUser(modification));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
