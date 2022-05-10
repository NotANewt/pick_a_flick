import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      savedBooks {
        bookId
        authors
        image
        description
        title
        link
      }
    }
  }
`;

export const QUERY_DEALBREAKER = gql`
  query Dealbreaker {
    dealbreaker {
      name
    }
  }
`;
