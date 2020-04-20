import React, { useState, useContext } from "react";
import { AccountContext } from "./Account";
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { authenticate } = useContext(AccountContext);
  const onSubmit = event => {
    event.preventDefault();
    authenticate(email, password)
      .then(data => console.log(data))
      .catch(err => console.error(err));
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <input
          type="text"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};
