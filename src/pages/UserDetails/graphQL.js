import { gql } from "@apollo/client";

export const GET_USER = gql`
  query getUser($uuid: String!) {
    getUser(uuid: $uuid) {
      uuid
      fullName
      username
      email
      userType
      roles {
        uuid
        name
        permissions {
          uuid
          name
        }
      }
    }
    getRoles {
      uuid
      name
    }
  }
`;

export const ASSIGN_ROLES = gql`
  mutation assignRoles($input: AssignRolesInput!) {
    assignRoles(assignRolesInput: $input) {
      uuid
      fullName
    }
  }
`;
