const findUserByEmail = (UserModel) => async (email) => {
  try {
    return await UserModel.findOne({ email });
  } catch (error) {
    throw new Error("UserRepo: Invalid email or password");
  }
};

const matchPassword = (UserModel) => (password) => {
  return UserModel.matchPassword(password);
};

const UserRepoImpl = (UserModel) => {
  return {
    findUserByEmail: findUserByEmail(UserModel),
    matchPassword: matchPassword(UserModel),
  };
};

export default UserRepoImpl;
