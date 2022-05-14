import { gql } from "@apollo/client";

export const QUERY_ME = gql`
  query me {
    me {
      _id
      username
      email
      dealbreakers
      movies {
        dddId
        movieDbId
        title
        year
        genre
        overview
        posterImage
        dealbreakers
      }
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
