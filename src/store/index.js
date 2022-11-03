import { ApolloClient, ApolloLink, from, HttpLink } from "@apollo/client";
import {
  ACCESS_DENIED,
  ACCESS_TOKEN,
  BAD_USER_INPUT,
  GRAPHQL_URL,
  INTERNAL_SERVER_ERROR,
  INVALID_LOGIN,
  UN_AUTHENTICATED,
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
    graphQLErrors.forEach(({ message, locations, path, extensions }) => {
      switch (extensions.code) {
        case INTERNAL_SERVER_ERROR:
          showToastTop(message);
          break;
        case UN_AUTHENTICATED:
          showToastTop(`Un-authorization  request`);
          window.location = "/";
          break;
        case BAD_USER_INPUT:
          showToastTop(extensions.response.message[0]);
          break;
        case INVALID_LOGIN:
          isLoggedInVar(false);
          break;
        case ACCESS_DENIED:
          showToastTop(message);
          break;
        default:
          showToastTop(message);
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
