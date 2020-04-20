import React from "react";
import { SignUp } from "./components/Signup";
import { Login } from "./components/Login";
import { Account } from "./components/Account";
import { Status } from "./components/Status";
import { Settings } from "./components/Settings";
import { ForgotPassword } from "./components/ForgotPassword";

function App() {
  return (
    <Account>
      <Status />
      <SignUp />
      <Login />
      <ForgotPassword />
      <Settings />
    </Account>
  );
}

export default App;
