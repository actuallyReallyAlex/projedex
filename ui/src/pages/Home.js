import React, { useState } from "react";
import PropTypes from "prop-types";
import LogIn from "../components/LogIn";
import SignUp from "../components/SignUp";
import Logout from "../components/Logout";
import DeleteUser from "../components/DeleteUser";
import ModifyUser from "../components/ModifyUser";
import CreateProject from "../components/CreateProject";
import DataViewer from "../components/DataViewer";
import RefreshDataButton from "../components/RefreshDataButton";
import LogoutAll from "../components/LogoutAll";
import IntegrateWithGitHub from "../components/IntegrateWithGitHub";
import GetRepos from "../components/GetRepos";
import { connect } from "react-redux";
import Info from "../components/Info";
import {
  Header,
  Icon,
  Container,
  Button,
  Divider,
  Grid,
  Transition,
  Segment
} from "semantic-ui-react";

const NotLoggedIn = () => {
  const [action, setAction] = useState("start");

  const handleLogIn = () => {
    setAction(null);
    setTimeout(() => {
      setAction("log-in");
    }, 600);
  };

  const handleSignUp = () => {
    setAction(null);
    setTimeout(() => {
      setAction("sign-up");
    }, 600);
  };

  const handleBack = () => {
    setAction(null);
    setTimeout(() => {
      setAction("start");
    }, 600);
  };

  return (
    <Container id="not-logged-in" className="not-logged-in__container">
      <Header as="h2" icon>
        <Icon circular inverted color="teal" name="code" />
        Projédex
        <Header.Subheader>
          Like a pokédex, but for your projects.
        </Header.Subheader>
      </Header>
      <Segment
        id="action-container"
        className="not-logged-in__action-container"
        placeholder
      >
        <Transition
          visible={action === "start"}
          animation="scale"
          duration={500}
        >
          <Grid columns={2} stackable textAlign="center">
            <Divider vertical>Or</Divider>

            <Grid.Row verticalAlign="middle">
              <Grid.Column>
                <Header icon>
                  <Icon name="sign-in" />
                </Header>
                <Button onClick={handleLogIn} primary>
                  Log in
                </Button>
              </Grid.Column>

              <Grid.Column>
                <Header icon>
                  <Icon name="signup" />
                </Header>
                <Button onClick={handleSignUp} secondary>
                  Sign up
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </Transition>
        <Transition
          visible={action === "log-in"}
          animation="scale"
          duration={500}
          unmountOnHide
        >
          <LogIn handleBack={handleBack} />
        </Transition>
        <Transition
          visible={action === "sign-up"}
          animation="scale"
          duration={500}
          unmountOnHide
        >
          <SignUp handleBack={handleBack} />
        </Transition>
      </Segment>
      <Info />
    </Container>
  );
};

const LoggedIn = ({ userData }) => {
  return (
    <div className="App">
      <RefreshDataButton />
      <DataViewer />
      <Logout />
      <LogoutAll />
      <DeleteUser />
      <ModifyUser />
      <CreateProject />
      {userData && !userData.user.accessToken && <IntegrateWithGitHub />}
      <GetRepos />
      <Info />
    </div>
  );
};

const Home = ({ userData }) => {
  return userData ? <LoggedIn userData={userData} /> : <NotLoggedIn />;
};

Home.propTypes = {
  userData: PropTypes.object
};

const mapStateToProps = ({ app, projects, user }) => ({
  userData: user.userData
});

export default connect(mapStateToProps, null)(Home);
