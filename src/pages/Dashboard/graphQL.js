import { gql } from "@apollo/client";

export const GET_NEW_USERS = gql`
  query getNewUsers {
    getNewUsers
  }
`;

export const GET_DASH_ALL_CONTACTS = gql`
  query getDashAllContacts {
    getDashAllContacts
  }
`;

export const GET_DASH_PRIVATE_CONTACTS = gql`
  query getDashPrivateContacts {
    getDashPrivateContacts
  }
`;

export const GET_DASH_PUBLIC_CONTACTS = gql`
  query getDashPublicContacts {
    getDashPublicContacts
  }
`;

export const GET_MY_DASH_PUBLIC_CONTACTS = gql`
  query getMyDashPublicContacts {
    getMyDashPublicContacts
  }
`;

export const GET_MY_DASH_PRIVATE_CONTACTS = gql`
  query getMyDashPrivateContacts {
    getMyDashPrivateContacts
  }
`;
