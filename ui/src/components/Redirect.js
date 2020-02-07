import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import { saveAccessToken, refreshData } from "../requests";

const Redirect = ({ setProjects, setUserData, userData }) => {
  const useQuery = () => new URLSearchParams(useLocation().search);
  const query = useQuery();
  const history = useHistory();
  const accessToken = query.get("accessToken");

  const cb = () => {
    refreshData(userData, setUserData, setProjects, () => {
      history.push("/");
    });
  };

  saveAccessToken(userData, accessToken, cb);

  return null;
};

Redirect.propTypes = {
  setProjects: PropTypes.func.isRequired,
  setUserData: PropTypes.func.isRequired,
  userData: PropTypes.object.isRequired
};

export default Redirect;
