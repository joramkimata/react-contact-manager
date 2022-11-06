import { gql } from "@apollo/client";

export const CHANGE_PASSWORD = gql`
  mutation changeLoggedInUserPassword(
    $password: String!
    $confirmPassword: String!
  ) {
    changeLoggedInUserPassword(
      password: $password
      confirmPassword: $confirmPassword
    ) {
      uuid
    }
  }
`;

export const GET_CURRENT_USER = gql`
  query getCurrentUserInfo {
    getCurrentUserInfo {
      uuid
      fullName
      username
      email
    }
  }
`;
