import React, { useState } from "react";
import PropTypes from "prop-types";
import { createUser } from "../redux/actions/user";
import { connect } from "react-redux";
import { Button, Container, Form, Input } from "semantic-ui-react";

const SignUp = ({ handleBack, handleCreateUser }) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);

  // TODO - ConfirmPassword functionality

  const handleSubmit = () => {
    console.log({ confirmPassword });
    handleCreateUser(email, name, password);
  };

  return (
    <Form onSubmit={handleSubmit}>
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
  handleBack: PropTypes.func.isRequired,
  handleCreateUser: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  handleCreateUser: (email, name, password) =>
    dispatch(createUser(email, name, password))
});

export default connect(null, mapDispatchToProps)(SignUp);
