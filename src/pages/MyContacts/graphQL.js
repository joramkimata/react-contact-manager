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

export const DELETE_CONTACT = gql`
  mutation deleteContact($uuid: String!) {
    deleteContact(uuid: $uuid) {
      uuid
    }
  }
`;

export const MAKE_CONTACT_PUBLIC = gql`
  mutation makeContactPublic($uuid: String!) {
    makeContactPublic(uuid: $uuid) {
      uuid
    }
  }
`;
