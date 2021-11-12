const User = require("../models/user");

module.exports.UserService = {
  find: async (params) => {
    try {
      const docs = await User.find(params);
      return {
        success: true,
        result: docs.map((el) => {
          return {
            id: el._id,
            email: el.email,
            username: el.username,
          };
        }),
      };
    } catch (error) {
      throw Error(error);
    }
  },
  findById: async (filter) => {
    try {
      const user = await User.findById(filter);
      return {
        success: true,
        result: {
          id: user._id,
          email: user.email,
          username: user.username,
        },
      };
    } catch (error) {
      throw Error(error);
    }
  },
  insertUser: async (doc) => {
    try {
      const user = new User(doc);
      const res = await user.save();
      const { _id } = res;
      return {
        success: true,
        result: _id,
      };
    } catch (error) {
      throw Error(error);
    }
  },
  updateUser: async (filter, newDoc) => {
    try {
      const user = await User.findByIdAndUpdate(filter, newDoc);
      return {
        success: true,
        result: {
          id: user._id,
          email: user.email,
          username: user.username,
          role: user.role,
        },
      };
    } catch (error) {
      throw Error(error);
    }
  },
  deleteUser: async (filter) => {
    try {
      const user = await User.findByIdAndDelete(filter);
      return { success: true };
    } catch (error) {
      throw Error(error);
    }
  },
  logout: async (filter) => {
    try {
      await User.findByIdAndUpdate(filter, { token: "" });
      return {
        success: true,
      };
    } catch (error) {
      throw Error(error);
    }
  },
  auth: async (user) => {
    return {
      admin: user.role === 1 ? true : false,
      isAuth: true,
      email: user.email,
      username: user.username,
    };
  },
};
