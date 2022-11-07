import { gql } from "@apollo/client";

export const GET_MY_CONTACTS = gql`
  query getMyContacts {
    getMyContacts {
      uuid
      phoneNumber
      isPublic
    }
  }
`;

export const CREATE_CONTACT = gql`
  mutation createContact($input: ContactInput!) {
    createContact(contactInput: $input) {
      uuid
    }
  }
`;
