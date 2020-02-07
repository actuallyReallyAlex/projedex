import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import { saveAccessToken, refreshData } from "../requests";
import { connect } from "react-redux";
import { setProjects, setUserData } from "../redux/actions/app";

const Redirect = ({ handleSetProjects, handleSetUserData, userData }) => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const history = useHistory();
  const accessToken = query.get("accessToken");

  const cb = () => {
    refreshData(userData, handleSetUserData, handleSetProjects, () => {
      history.push("/");
    });
  };

  saveAccessToken(userData, accessToken, cb);

  return null;
};

Redirect.propTypes = {
  handleSetProjects: PropTypes.func.isRequired,
  handleSetUserData: PropTypes.func.isRequired,
  userData: PropTypes.object
};

const mapStateToProps = ({ app }) => ({ userData: app.userData });

const mapDispatchToProps = dispatch => ({
  handleSetProjects: projects => dispatch(setProjects(projects)),
  handleSetUserData: userData => dispatch(setUserData(userData))
});

export default connect(mapStateToProps, mapDispatchToProps)(Redirect);
