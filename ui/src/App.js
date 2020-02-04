import React, { useState, useEffect } from "react";
import request from "request";

const App = () => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  const handleSubmit = async e => {
    e.preventDefault();

    const proxy = "https://cors-anywhere.herokuapp.com/";

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

        setUser(body.user);
        setToken(body.token);
      }
    );
  };

  useEffect(() => {
    const localStorageUser = window.localStorage.getItem("user");
    const localStorageToken = window.localStorage.getItem("token");

    if (!localStorageUser) {
      if (user) {
        window.localStorage.setItem("user", JSON.stringify(user));
      }
    } else {
      if (!user) {
        const userObj = JSON.parse(localStorageUser);
        setUser(userObj);
        setName(userObj.name);
        setEmail(userObj.email);
      }
    }

    if (!localStorageToken) {
      if (token) {
        window.localStorage.setItem("token", token);
      }
    } else {
      if (!token) {
        setToken(localStorageToken);
      }
    }
  }, [user, token]);

  return (
    <div className="App">
      <h1>Projedex (BASIC UI)</h1>
      <pre>{JSON.stringify({ user, token, name, email }, null, 2)}</pre>
      <form onSubmit={handleSubmit}>
        {!user && (
          <div id="login">
            <label>Name</label>
            <input
              id="name"
              onChange={e => setName(e.target.value)}
              type="text"
            />
            <label>Email</label>
            <input
              id="email"
              onChange={e => setEmail(e.target.value)}
              type="text"
            />
            <label>Password</label>
            <input
              id="password"
              onChange={e => setPassword(e.target.value)}
              type="text"
            />
            <button type="submit">Login</button>
          </div>
        )}
      </form>
    </div>
  );
};

export default App;
