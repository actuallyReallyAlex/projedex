import React from "react";
import PropTypes from "prop-types";
import Info from "../components/Info";
import { Grid, Placeholder } from "semantic-ui-react";
import Sidebar from "./Sidebar";
import { connect } from "react-redux";
import Home from "./Home";
import Settings from "./Settings";

const contentOptions = {
  home: Home,
  settings: Settings
};

const Dashboard = ({ content }) => {
  const SelectedContent = contentOptions[content];
  
  return (
    <Grid className="application" columns={3} divided id="app">
      <Grid.Column width={2}>
        <Sidebar />
      </Grid.Column>
      <Grid.Column width={10}>
        <SelectedContent />
        <Info />
      </Grid.Column>
      <Grid.Column width={4}>
        <Placeholder>
          <Placeholder.Header image>
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Header>
          <Placeholder.Paragraph>
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
            <Placeholder.Line />
          </Placeholder.Paragraph>
        </Placeholder>
      </Grid.Column>
    </Grid>
  );
};

Dashboard.propTypes = {
  content: PropTypes.string.isRequired
};

const mapStateToProps = ({ app }) => ({ content: app.content });

export default connect(mapStateToProps, null)(Dashboard);
