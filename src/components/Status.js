import React, { useContext, useEffect, useState } from "react";
import { AccountContext } from "./Account";

export const Status = () => {
  const [status, setStatus] = useState(false);
  const { getSession, logout } = useContext(AccountContext);

  useEffect(() => {
    getSession().then(session => {
      console.log(session);
      setStatus(true);
    });
  }, []);

  return (
    <div>
      {status ? <button onClick={logout}>Logout</button> : "Please login below"}
    </div>
  );
};
