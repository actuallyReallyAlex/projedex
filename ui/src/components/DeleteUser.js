import React from "react";
import { deleteUser } from "../requests";

const DeleteUser = ({ setUserData, userData }) => {
  const handleDeleteUser = () => deleteUser(userData, setUserData);
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
