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

export const QUERY_GROUP = gql`
  query Group {
    group {
      _id
      joincode
      admin
      users
      groupname
      description
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
