import React, { useState, useEffect, Fragment } from "react";
import Login from "./components/Login";
import CreateUser from "./components/CreateUser";
import Logout from "./components/Logout";

const App = () => {
  const [userData, setUserData] = useState(null);
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  useEffect(() => {
    const localStorageUserData = window.localStorage.getItem("userData");

    if (localStorageUserData && !userData) {
      setUserData(localStorageUserData);
    } else if (!localStorageUserData && userData) {
      window.localStorage.setItem("userData", JSON.stringify(userData));
    }
  }, [userData]);

  return (
    <div className="App">
      <h1>Projedex (BASIC UI)</h1>
      <pre>{JSON.stringify({ userData }, null, 2)}</pre>
      <form>
        {!userData && (
          <Fragment>
            <CreateUser
              setName={setName}
              setEmail={setEmail}
              setPassword={setPassword}
              email={email}
              password={password}
              name={name}
              setUserData={setUserData}
            />
            <Login
              email={email}
              password={password}
              setEmail={setEmail}
              setPassword={setPassword}
              setUserData={setUserData}
            />
          </Fragment>
        )}
        {userData && <Logout setUserData={setUserData} userData={userData} />}
      </form>
    </div>
  );
};

export default App;
