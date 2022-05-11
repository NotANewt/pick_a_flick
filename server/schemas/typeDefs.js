const { gql } = require("apollo-server-express");

const typeDefs = gql`
  type User {
    _id: ID!
    username: String!
    email: String
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

  type Query {
    me: User
    dealbreaker: [Dealbreaker]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
  }
`;

module.exports = typeDefs;
