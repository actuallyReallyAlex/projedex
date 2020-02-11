import React from "react";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import { saveAccessToken } from "../requests";
import { refreshData } from "../redux/actions/app";
import { connect } from "react-redux";
import { setShouldHitSaveToken } from "../redux/actions/app";
import { version } from "../../package.json";

const Redirect = ({
  handleRefreshData,
  handleSetShouldHitSaveToken,
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
      // refreshData(userData, handleSetUserData, handleSetProjects, () => {
      //   history.push("/");
      // });
      handleRefreshData(history);
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
  handleRefreshData: PropTypes.func.isRequired,
  handleSetShouldHitSaveToken: PropTypes.func.isRequired,
  shouldHitSaveToken: PropTypes.bool.isRequired,
  userData: PropTypes.object
};

const mapStateToProps = ({ app, user }) => ({
  shouldHitSaveToken: app.shouldHitSaveToken,
  userData: user.userData
});

const mapDispatchToProps = dispatch => ({
  handleRefreshData: history => dispatch(refreshData(history)),
  handleSetShouldHitSaveToken: shouldHitSaveToken =>
    dispatch(setShouldHitSaveToken(shouldHitSaveToken))
});

export default connect(mapStateToProps, mapDispatchToProps)(Redirect);
