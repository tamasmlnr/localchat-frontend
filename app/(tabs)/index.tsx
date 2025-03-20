import useLoadAuthState from "@/hooks/useLoadAuthState";
import { selectIsAuthenticated } from "@/store/selectors/authSelectors";
import AccountOverview from "@/views/AccountOverview";
import { Redirect } from "expo-router";
import React from "react";
import { useSelector } from "react-redux";

const HomeScreen = () => {
  useLoadAuthState();
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? <AccountOverview /> : <Redirect href="/auth" />

};

export default HomeScreen;