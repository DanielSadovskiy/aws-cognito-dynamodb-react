import { CognitoUserPool } from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: "eu-central-1_TaMMBPkCk",
  ClientId: "2dq6u9f51cjsdtvrlovkemnj7j"
};
export const UserPool = new CognitoUserPool(poolData);
