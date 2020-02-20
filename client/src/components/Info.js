import React from "react";
import { version } from "../../package.json";

const Info = () => {
  return (
    <span
      style={{ bottom: "0", fontSize: "10px", left: "0", position: "absolute" }}
    >
      Projedex (BASIC UI) v{version}
    </span>
  );
};

export default Info;
