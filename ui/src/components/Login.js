import React, { useState } from "react";
import PropTypes from "prop-types";
import { login } from "../redux/actions/user";
import { connect } from "react-redux";
import { Button, Form, Container } from "semantic-ui-react";

const LogIn = ({ handleBack, handleLogin }) => {
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = () => {
    handleLogin(email, password);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Field>
        <label>Email</label>
        <input id="login-email" onChange={e => setEmail(e.target.value)} />
      </Form.Field>
      <Form.Field>
        <label>Password</label>
        <input
          id="login-password"
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Field>
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
  handleBack: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  handleLogin: (email, password) => dispatch(login(email, password))
});

export default connect(null, mapDispatchToProps)(LogIn);
