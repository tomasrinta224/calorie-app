import React, { createContext, PropsWithChildren, useContext } from "react";
import { useGetUserInfo } from "hooks/api/users";
import { CircularProgress } from "@mui/material";
import { IUserInfo } from "types";
import { isEmpty } from "lodash";

export interface IAuthContext {
  userInfo: IUserInfo;
}

const AuthContext = createContext<IAuthContext>({} as IAuthContext);
AuthContext.displayName = "AuthContext";

export const AuthProvider = ({
  children,
}: PropsWithChildren<Record<string, unknown>>) => {
  const { data: userInfo, isLoading } = useGetUserInfo();

  if (isLoading || !userInfo) {
    return <CircularProgress />;
  }

  return (
    <AuthContext.Provider value={{ userInfo }}>{children}</AuthContext.Provider>
  );
};

export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);
  if (isEmpty(context)) {
    throw new Error(
      "useAuth hook must be used within a AuthProvider component"
    );
  }
  return context;
};
