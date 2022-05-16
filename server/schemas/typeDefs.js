const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
    dealbreakers: [String]
    movies: [Movie]
  }

  type Movie {
    dddId: Int
    movieDbId: Int
    title: String
    year: String
    genre: String
    overview: String
    posterImage: String
    dealbreakers: [String]
  }

  input MovieInput {
    dddId: Int
    movieDbId: Int
    title: String
    year: String
    genre: String
    overview: String
    posterImage: String
    dealbreakers: [String]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Dealbreaker {
    _id: ID!
    question: String
    name: String
    not_name: String
  }

  type Group {
    _id: ID!
    joincode: String
    admin: String
    users: [String]
    groupname: String
    description: String
    movies: [Movie]
  }

  type Query {
    me: User
    dealbreaker: [Dealbreaker]
    group: [Group]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveUserDealbreaker(dealbreaker: String): User
    removeUserDealbreaker(dealbreaker: String): User
    saveUserMovie(movieData: MovieInput): User
    removeUserMovie(movieData: MovieInput): User
    addGroup(joincode: String, admin: String, users: [String], groupname: String, description: String): Group
    removeGroup(_id: String): Group
    saveUserMovieToGroup(_id: String, movieData: MovieInput): Group
    removeMovieFromGroup(_id: String, movieData: MovieInput): Group
    addUserToGroup(_id: String, user: String): Group
  }
`;

module.exports = typeDefs;
