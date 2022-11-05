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
