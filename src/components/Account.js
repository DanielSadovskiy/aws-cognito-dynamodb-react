import React, { createContext } from "react";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { UserPool } from "../UserPool";

export const AccountContext = createContext();

export const Account = props => {
  const getSession = async () =>
    await new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession(async (err, session) => {
          if (err) {
            reject();
          } else {
            const attributes = await new Promise((resolve, reject) => {
              user.getUserAttributes((err, attributes) => {
                if (err) {
                  reject(err);
                } else {
                  const results = {};

                  for (let attribute of attributes) {
                    const { Name, Value } = attribute;
                    results[Name] = Value;
                  }

                  resolve(results);
                }
              });
            });

            resolve({
              user,
              ...session,
              ...attributes
            });
          }
        });
      } else {
        reject( );
      }
    });
  const authenticate = async (email, password) => {
    await new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username: email,
        Pool: UserPool
      });
      const authDetails = new AuthenticationDetails({
        Username: email,
        Password: password
      });
      user.authenticateUser(authDetails, {
        onSuccess: data => {
          console.log(data);
          resolve(data);
        },
        onFailure: err => {
          console.error(err);
          reject(err);
        },
        newPasswordRequired: data => {
          console.log("New Password Required", data);
          resolve(data);
        }
      });
    });
  };

  const logout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      user.signOut();
    }
  };
  return (
    <AccountContext.Provider value={{ authenticate, getSession, logout }}>
      {props.children}
    </AccountContext.Provider>
  );
};
