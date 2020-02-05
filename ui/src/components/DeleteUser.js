import React from "react";
import request from "request";
import { proxy } from "../constants";

const DeleteUser = ({ setUserData, userData }) => {
  const handleDeleteUser = () => {
    request(
      proxy + "https://projedex.herokuapp.com/users/me",
      {
        json: true,
        method: "DELETE",
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
          window.localStorage.removeItem("userData");
          setUserData(null);
        }
      }
    );
  };
  return (
    <div id="delete-user">
      <h2>Delete User</h2>
      <button onClick={handleDeleteUser} type="button">
        Delete User
      </button>
    </div>
  );
};

export default DeleteUser;
