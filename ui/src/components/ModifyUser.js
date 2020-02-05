import React, { useState } from "react";
import request from "request";
import { proxy } from "../constants";

const ModifyUser = ({ setUserData, userData }) => {
  const [email, setEmail] = useState(null);
  const [name, setName] = useState(null);
  const [password, setPassword] = useState(null);

  const handleModifyUser = () => {
    const requestBody = {};
    const fields = [{ email }, { name }, { password }];

    fields.forEach(field => {
      const key = Object.keys(field);
      if (field[key]) requestBody[key] = field[key];
    });

    request(
      proxy + "https://projedex.herokuapp.com/users/me",
      {
        json: true,
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: requestBody,
        auth: {
          bearer: userData.token
        }
      },
      (error, response, body) => {
        if (error) {
          document.getElementById("modify-user-email").value = "";
          document.getElementById("modify-user-name").value = "";
          document.getElementById("modify-user-password").value = "";
          return console.error(error);
        }

        if (response.statusCode === 200) {
          document.getElementById("modify-user-email").value = "";
          document.getElementById("modify-user-name").value = "";
          document.getElementById("modify-user-password").value = "";
          setUserData({ ...userData, user: body });
        }
      }
    );
  };

  return (
    <div id="modify-user">
      <h2>Modify User</h2>
      <span>Not all fields are required.</span>
      <div>
        <label>Email</label>
        <input
          id="modify-user-email"
          onChange={e => setEmail(e.target.value)}
          type="text"
        />
        <label>Name</label>
        <input
          id="modify-user-name"
          onChange={e => setName(e.target.value)}
          type="text"
        />
        <label>Password</label>
        <input
          id="modify-user-password"
          onChange={e => setPassword(e.target.value)}
          type="text"
        />
        <button onClick={handleModifyUser} type="button">
          Modify User
        </button>
      </div>
    </div>
  );
};

export default ModifyUser;
