const { AuthenticationError } = require("apollo-server-express");
const { User, Dealbreaker } = require("../models");
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
        const updatedUser = await User.findOneAndUpdate(context.user._id, { $pull: { dealbreakers: dealbreaker } });
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
  },
};

module.exports = resolvers;
