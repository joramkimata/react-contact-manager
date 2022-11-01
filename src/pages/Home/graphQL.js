import { gql } from "@apollo/client";

export const GET_PUBLIC_CONTACTS = gql`
  query getPublicContacts {
    getPublicContacts {
      uuid
      phoneNumber
      user {
        fullName
        username
      }
    }
  }
`;
