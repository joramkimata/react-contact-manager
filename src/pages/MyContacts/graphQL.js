import { gql } from "@apollo/client";

export const GET_MY_CONTACTS = gql`
  query getMyContacts {
    getMyContacts {
      uuid
      phoneNumber
    }
  }
`;
