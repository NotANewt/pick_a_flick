const { AuthenticationError } = require("apollo-server-express");
const { User, Dealbreaker, Group } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id }).select("-__v -password");

        return userData;
      }

      throw new AuthenticationError("Not logged in");
    },
    dealbreaker: async () => {
      return Dealbreaker.find({});
    },
    group: async () => {
      return Group.find({});
    },
    user: async () => {
      return User.find({});
    },
  },

  Mutation: {
    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },
    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },
    saveUserDealbreaker: async (parent, { dealbreaker }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(context.user._id, { $push: { dealbreakers: dealbreaker } });
        return updatedUser;
      }
    },
    removeUserDealbreaker: async (parent, { dealbreaker }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(context.user._id, { $pull: { dealbreakers: dealbreaker } });
        return updatedUser;
      }
    },
    saveUserMovie: async (parent, { movieData }, context) => {
      if (context.user) {
        const updatedUser = await User.findByIdAndUpdate(context.user._id, { $push: { movies: movieData } });
        return updatedUser;
      }
    },
    removeUserMovie: async (parent, { movieData }, context) => {
      return await User.findByIdAndUpdate(context.user._id, { $pull: { movies: movieData } });
    },
    addGroup: async (parent, args) => {
      const newGroup = await Group.create(args);
      return newGroup;
    },
    removeGroup: async (parent, args) => {
      return await Group.findOneAndDelete(args);
    },
    saveUserMovieToGroup: async (parent, { _id, movieData }) => {
      const updatedGroup = await Group.findByIdAndUpdate(_id, { $push: { movies: movieData } });
      return updatedGroup;
    },
    removeMovieFromGroup: async (parent, { _id, movieData }) => {
      const updatedGroup = await Group.findByIdAndUpdate(_id, { $pull: { movies: movieData } });
      return updatedGroup;
    },
    addUserToGroup: async (parent, { _id, user }) => {
      const updatedGroup = await Group.findByIdAndUpdate(_id, { $push: { users: user } });
      return updatedGroup;
    },
  },
};

module.exports = resolvers;
