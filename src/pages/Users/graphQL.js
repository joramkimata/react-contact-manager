import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query getUsers {
    getUsers {
      uuid
      fullName
      username
      email
      userType
    }
  }
`;

export const CREATE_USER = gql`
  mutation registerUser($input: UserInput!) {
    registerUser(userInput: $input) {
      uuid
    }
  }
`;
