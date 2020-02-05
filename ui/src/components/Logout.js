import React from "react";
import { proxy } from "../constants";
import request from "request";

const Logout = ({ setUserData, userData, setProjects }) => {
  const handleLogout = () => {
    request(
      proxy + "https://projedex.herokuapp.com/users/logout",
      {
        json: true,
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        auth: {
          bearer: userData.token
        }
      },
      (error, response, body) => {
        if (error) {
          return console.error(error);
        }

        if (response.statusCode === 200) {
          setUserData(null);
          setProjects([]);
        }
      }
    );
  };
  return (
    <div id="logout">
      <h2>Logout</h2>
      <button onClick={handleLogout} type="button">
        Logout
      </button>
    </div>
  );
};

export default Logout;
