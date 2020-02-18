import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { createUser } from "../redux/actions/user";
import { connect } from "react-redux";
import { Button, Container, Form, Input, Message } from "semantic-ui-react";
import validator from "validator";
import { setError, setLoading } from "../redux/actions/app";

const SignUp = ({
  error,
  handleBack,
  handleCreateUser,
  handleError,
  handleResetState,
  loading
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  useEffect(() => {
    return () => handleResetState();
  }, [handleResetState]);

  const handleSubmit = () => {
    if (validator.isEmpty(name)) {
      return handleError("Please provide a name for the user.");
    }

    if (!validator.isEmail(email) || validator.isEmpty(email)) {
      return handleError("Please enter a valid email address.");
    }

    if (validator.isEmpty(password) || validator.isEmpty(confirmPassword)) {
      return handleError("Please enter a password.");
    }

    if (password !== confirmPassword) {
      return handleError("Passwords do not match.");
    }

    handleCreateUser(email, name, password);
  };

  return (
    <Form error={error.state} loading={loading} onSubmit={handleSubmit}>
      <Message error header="Error" content={error.message} />
      <Form.Field
        control={Input}
        label="Name"
        onChange={e => setName(e.target.value)}
      />
      <Form.Field
        control={Input}
        label="Email"
        onChange={e => setEmail(e.target.value)}
      />
      <Form.Field
        control={Input}
        label="Password"
        onChange={e => setPassword(e.target.value)}
        type="password"
      />
      <Form.Field
        control={Input}
        label="Confirm Password"
        onChange={e => setConfirmPassword(e.target.value)}
        type="password"
      />
      <Container
        className="button__container"
        fluid
        id="sign-up-button-container"
      >
        <Button primary type="submit">
          Sign up
        </Button>
        <Button onClick={handleBack} secondary type="button">
          Back
        </Button>
      </Container>
    </Form>
  );
};

SignUp.propTypes = {
  error: PropTypes.object.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleCreateUser: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  handleResetState: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = ({ app }) => ({
  error: app.error,
  loading: app.loading
});

const mapDispatchToProps = dispatch => ({
  handleCreateUser: (email, name, password) =>
    dispatch(createUser(email, name, password)),
  handleError: error => dispatch(setError({ state: true, message: error })),
  handleResetState: () => {
    dispatch(setError({ state: null, message: "" }));
    dispatch(setLoading(false));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
