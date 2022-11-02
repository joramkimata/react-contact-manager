import { InMemoryCache, makeVar } from "@apollo/client";
import { ACCESS_TOKEN } from "../utils/constants";

// Reactive Variables
export const isLoggedInVar = makeVar(!!localStorage.getItem(ACCESS_TOKEN));
export const userPermissions = makeVar([]);

// Cache
export const cache = new InMemoryCache();
