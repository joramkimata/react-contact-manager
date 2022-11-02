import { useApolloClient } from "@apollo/client";
import { useCallback } from "react";
import { isLoggedInVar } from "../store/cache";
import { ACCESS_TOKEN } from "../utils/constants";

export default function useLogout() {
  const client = useApolloClient();

  const logout = useCallback(() => {
    client.clearStore();
    client.cache.gc();
    localStorage.removeItem(ACCESS_TOKEN);
    //localStorage.removeItem(MY_PERMISSIONS);
    // Set the logged-in status to false
    isLoggedInVar(false);
  }, []);

  return {
    logout,
  };
}
