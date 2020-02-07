import React from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import { saveAccessToken, refreshData } from "../requests";
import { connect } from "react-redux";
import {
  setProjects,
  setUserData,
  setShouldHitSaveToken
} from "../redux/actions/app";
import { version } from "../../package.json";

const Redirect = ({
  handleSetProjects,
  handleSetShouldHitSaveToken,
  handleSetUserData,
  shouldHitSaveToken,
  userData
}) => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const history = useHistory();
  const accessToken = query.get("accessToken");

  // * Only want to make the call if there is an accesstoken in the url
  // * AND if the call has not already been made
  // * seeing this happening like 4 times
  if (accessToken && shouldHitSaveToken) {
    console.log({ accessToken });
    const cb = () => {
      refreshData(userData, handleSetUserData, handleSetProjects, () => {
        history.push("/");
      });
    };

    saveAccessToken(userData, accessToken, cb);
    handleSetShouldHitSaveToken(false);
  } else {
    console.log({ accessToken, shouldHitSaveToken });
  }

  return (
    <div>
      <h1>REDIRECT {version}</h1>
    </div>
  );
};

Redirect.propTypes = {
  handleSetProjects: PropTypes.func.isRequired,
  handleSetShouldHitSaveToken: PropTypes.func.isRequired,
  handleSetUserData: PropTypes.func.isRequired,
  shouldHitSaveToken: PropTypes.bool.isRequired,
  userData: PropTypes.object
};

const mapStateToProps = ({ app }) => ({
  shouldHitSaveToken: app.shouldHitSaveToken,
  userData: app.userData
});

const mapDispatchToProps = dispatch => ({
  handleSetProjects: projects => dispatch(setProjects(projects)),
  handleSetShouldHitSaveToken: shouldHitSaveToken =>
    dispatch(setShouldHitSaveToken(shouldHitSaveToken)),
  handleSetUserData: userData => dispatch(setUserData(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Redirect);
