import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query getUsers {
    getUsers {
      uuid
      fullName
      username
      email
      userType
      active
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

export const ACTIVATE_USER = gql`
  mutation activateUser($uuid: String!) {
    activateUser(uuid: $uuid) {
      uuid
    }
  }
`;

export const BLOCK_USER = gql`
  mutation blockUser($uuid: String!) {
    blockUser(uuid: $uuid) {
      uuid
    }
  }
`;

export const DELETE_USER = gql`
  mutation deleteUser($uuid: String!) {
    deleteUser(uuid: $uuid) {
      uuid
    }
  }
`;

export const CHANGE_USER_PASSWORD = gql`
  mutation changeUserPassword(
    $confirmPassword: String!
    $password: String!
    $uuid: String!
  ) {
    changeUserPassword(
      confirmPassword: $confirmPassword
      password: $password
      uuid: $uuid
    ) {
      uuid
      fullName
    }
  }
`;

export const UPDATE_USER = gql`
  mutation updateUser($uuid: String!, $input: UpdateUserInput!) {
    updateUser(uuid: $uuid, userInput: $input) {
      uuid
    }
  }
`;
