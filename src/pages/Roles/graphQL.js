import { gql } from "@apollo/client";

export const GET_ALL_ROLES = gql`
  query getRoles {
    getRoles {
      uuid
      name
      displayName
    }
  }
`;

export const CREATE_ROLE = gql`
  mutation createRole($input: RoleInput!) {
    createRole(createRoleInput: $input) {
      uuid
      name
      displayName
    }
  }
`;

export const DELETE_ROLE = gql`
  mutation deleteRole($uuid: String!) {
    deleteRole(uuid: $uuid) {
      uuid
    }
  }
`;

export const UPDATE_ROLE = gql`
  mutation updateRole($input: RoleInput!, $uuid: String!) {
    updateRole(updateRoleInput: $input, uuid: $uuid) {
      uuid
    }
  }
`;

export const GET_ROLE = gql`
  query getRole($uuid: String!) {
    getRole(uuid: $uuid) {
      uuid
      name
      displayName
      permissions {
        uuid
        name
      }
    }
    getAllPermissionsGroupedByPermissionGroupName(roleUuid: $uuid) {
      permissionGroupName
      permissions {
        uuid
        name
        displayName
        groupName
        belongToThisRole
      }
    }
  }
`;
