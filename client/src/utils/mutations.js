import { gql } from "@apollo/client";

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_USER_DEALBREAKER = gql`
  mutation saveUserDealbreaker($dealbreaker: String) {
    saveUserDealbreaker(dealbreaker: $dealbreaker) {
      dealbreakers
      _id
    }
  }
`;

export const REMOVE_USER_DEALBREAKER = gql`
  mutation removeUserDealbreaker($dealbreaker: String) {
    removeUserDealbreaker(dealbreaker: $dealbreaker) {
      dealbreakers
    }
  }
`;
