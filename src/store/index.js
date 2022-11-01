import { ApolloClient, ApolloLink, from, HttpLink } from "@apollo/client";
import {
  ACCESS_DENIED,
  ACCESS_TOKEN,
  GRAPHQL_URL,
  INVALID_LOGIN,
} from "../utils/constants";
import { showToastTop } from "../utils/helpers";
import { cache, isLoggedInVar } from "./cache";

import { onError } from "@apollo/client/link/error";

const authMiddleware = new ApolloLink((operation, forward) => {
  // add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization:
        `bearer ${JSON.parse(localStorage.getItem(ACCESS_TOKEN))}` || null,
    },
  }));

  return forward(operation);
});

const httpLink = new HttpLink({
  uri: GRAPHQL_URL,
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) => {
      switch (message) {
        case INVALID_LOGIN:
          isLoggedInVar(false);
          break;
        case ACCESS_DENIED:
          showToastTop(message);
          break;
        default:
          break;
      }
    });

  if (networkError) {
    showToastTop(networkError.message);
  }
});

const client = new ApolloClient({
  connectToDevTools: true,
  link: from([authMiddleware, errorLink, httpLink]),
  cache: cache,
});

export default client;
