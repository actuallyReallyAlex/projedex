import React from "react";
import { createUser } from "../requests";

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

    createUser(email, password, name, setUserData);
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
