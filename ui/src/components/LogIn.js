import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { logIn } from "../redux/actions/user";
import { connect } from "react-redux";
import { Button, Form, Container, Input, Message } from "semantic-ui-react";
import { setLoading, setError } from "../redux/actions/app";
import validator from "validator";

const LogIn = ({
  error,
  handleBack,
  handleError,
  handleLogIn,
  handleResetState,
  loading
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    return () => handleResetState();
  }, [handleResetState]);

  const handleSubmit = () => {
    if (!validator.isEmail(email) || validator.isEmpty(email)) {
      return handleError("Please enter a valid email address.");
    }

    if (validator.isEmpty(password)) {
      return handleError("Please enter a password.");
    }

    handleLogIn(email, password);
  };

  return (
    <Form error={error.state} loading={loading} onSubmit={handleSubmit}>
      <Message error header="Error" content={error.message} />
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
      <Container
        className="button__container"
        fluid
        id="log-in-button-container"
      >
        <Button primary type="submit">
          Log in
        </Button>
        <Button onClick={handleBack} secondary type="button">
          Back
        </Button>
      </Container>
    </Form>
  );
};

LogIn.propTypes = {
  error: PropTypes.object.isRequired,
  handleBack: PropTypes.func.isRequired,
  handleError: PropTypes.func.isRequired,
  handleLogIn: PropTypes.func.isRequired,
  handleResetState: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = ({ app }) => ({
  error: app.error,
  loading: app.loading
});

const mapDispatchToProps = dispatch => ({
  handleError: error => dispatch(setError({ state: true, message: error })),
  handleLogIn: (email, password) => {
    dispatch(setLoading(true));
    dispatch(logIn(email, password));
  },
  handleResetState: () => {
    dispatch(setError({ state: null, message: "" }));
    dispatch(setLoading(false));
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);
