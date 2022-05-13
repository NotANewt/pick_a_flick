import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      dealbreakers
    }
  }
`;

export const QUERY_DEALBREAKER = gql`
  query Dealbreaker {
    dealbreaker {
      name
      _id
    }
  }
`;
