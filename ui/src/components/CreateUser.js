import React from "react";
import request from "request";
import { proxy } from "../constants";

const CreateUser = ({
  setName,
  setEmail,
  setPassword,
  email,
  password,
  name,
  setUserData
}) => {
  const handleCreateUser = async e => {
    e.preventDefault();

    request(
      proxy + "https://projedex.herokuapp.com/users",
      {
        json: true,
        body: { email, password, name },
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        }
      },
      (error, response, body) => {
        if (error) {
          return console.error(error);
        }

        setUserData(body);
      }
    );
  };
  return (
    <div id="createUser">
      <h2>Create User</h2>
      <label>Name</label>
      <input
        id="create-user-name"
        onChange={e => setName(e.target.value)}
        type="text"
      />
      <label>Email</label>
      <input
        id="create-user-email"
        onChange={e => setEmail(e.target.value)}
        type="text"
      />
      <label>Password</label>
      <input
        id="create-user-password"
        onChange={e => setPassword(e.target.value)}
        type="text"
      />
      <button onClick={handleCreateUser} type="button">
        Create User
      </button>
    </div>
  );
};

export default CreateUser;
