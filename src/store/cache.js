import { makeVar } from "@apollo/client";
import { ACCESS_TOKEN } from "../utils/constants";

export const isLoggedInVar = makeVar(!!localStorage.getItem(ACCESS_TOKEN));
