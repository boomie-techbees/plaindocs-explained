import { Amplify } from "aws-amplify";

let configured = false;

export function configureAmplify() {
  if (configured || typeof window === "undefined") return;
  Amplify.configure({
    Auth: {
      Cognito: {
        userPoolId: "us-east-1_VHMBH4reW",
        userPoolClientId: "2v25gq0b51uu9lt95mikcaorj4",
        loginWith: { email: true },
      },
    },
  });
  configured = true;
}
