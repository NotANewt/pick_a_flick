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

export const SAVE_USER_MOVIE = gql`
  mutation saveUserMovie($movieData: MovieInput) {
    saveUserMovie(movieData: $movieData) {
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

export const REMOVE_USER_MOVIE = gql`
  mutation removeUserMovie($movieData: MovieInput) {
    removeUserMovie(movieData: $movieData) {
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

export const ADD_GROUP = gql`
  mutation addGroup($joincode: String, $admin: String, $users: [String], $groupname: String, $description: String) {
    addGroup(joincode: $joincode, admin: $admin, users: $users, groupname: $groupname, description: $description) {
      _id
    }
  }
`;

export const REMOVE_GROUP = gql`
  mutation removeGroup($id: String) {
    removeGroup(_id: $id) {
      joincode
    }
  }
`;

export const SAVE_USER_MOVIE_TO_GROUP = gql`
  mutation saveUserMovieToGroup($movieData: MovieInput) {
    saveUserMovieToGroup(movieData: $movieData) {
      groupname
    }
  }
`;
