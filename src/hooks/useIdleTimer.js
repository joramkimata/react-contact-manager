import { useReactiveVar } from "@apollo/client";
import { useEffect } from "react";
import { isLoggedInVar } from "../store/cache";
import { IdleTimer } from "../utils/IdleTimer";

export default function useIdleTimer(callLogoutUser = null, timeout = 300) {
  const isLoggedIn = useReactiveVar(isLoggedInVar);

  useEffect(() => {
    const timer = new IdleTimer({
      timeout, //expire after 5 min
      onTimeout: () => {
        if (isLoggedIn) {
          if (callLogoutUser !== null) {
            callLogoutUser();
          }
        }
      },
      onExpired: () => {
        // do something if expired on load
        if (isLoggedIn) {
          if (callLogoutUser !== null) {
            callLogoutUser();
          }
        }
      },
    });

    return () => {
      timer.cleanUp();
    };
  }, []);
}
