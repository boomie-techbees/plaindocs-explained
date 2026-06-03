import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { Hub } from "aws-amplify/utils";
import {
  getCurrentUser,
  fetchUserAttributes,
  signIn as amplifySignIn,
  signUp as amplifySignUp,
  confirmSignUp as amplifyConfirmSignUp,
  signOut as amplifySignOut,
  resetPassword as amplifyResetPassword,
  confirmResetPassword as amplifyConfirmResetPassword,
} from "aws-amplify/auth";

import { configureAmplify } from "./amplify";

type Status = "loading" | "authenticated" | "unauthenticated";

type AuthUser = { username: string; email: string };

type AuthContextValue = {
  status: Status;
  user: AuthUser | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<{ needsConfirmation: boolean }>;
  confirmSignUp: (email: string, code: string) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  confirmResetPassword: (email: string, code: string, newPassword: string) => Promise<void>;
  refresh: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<Status>("loading");
  const [user, setUser] = useState<AuthUser | null>(null);

  async function refresh() {
    try {
      const current = await getCurrentUser();
      let email = "";
      try {
        const attrs = await fetchUserAttributes();
        email = attrs.email ?? "";
      } catch {
        // ignore
      }
      setUser({ username: current.username, email: email || current.username });
      setStatus("authenticated");
    } catch {
      setUser(null);
      setStatus("unauthenticated");
    }
  }

  useEffect(() => {
    configureAmplify();
    refresh();
    const unsub = Hub.listen("auth", ({ payload }) => {
      if (
        payload.event === "signedIn" ||
        payload.event === "signedOut" ||
        payload.event === "tokenRefresh"
      ) {
        refresh();
      }
    });
    return () => unsub();
  }, []);

  const value: AuthContextValue = {
    status,
    user,
    signIn: async (email, password) => {
      await amplifySignIn({ username: email, password });
      await refresh();
    },
    signUp: async (email, password) => {
      const res = await amplifySignUp({
        username: email,
        password,
        options: { userAttributes: { email } },
      });
      return { needsConfirmation: !res.isSignUpComplete };
    },
    confirmSignUp: async (email, code) => {
      await amplifyConfirmSignUp({ username: email, confirmationCode: code });
    },
    signOut: async () => {
      await amplifySignOut();
      await refresh();
    },
    resetPassword: async (email) => {
      await amplifyResetPassword({ username: email });
    },
    confirmResetPassword: async (email, code, newPassword) => {
      await amplifyConfirmResetPassword({
        username: email,
        confirmationCode: code,
        newPassword,
      });
    },
    refresh,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
