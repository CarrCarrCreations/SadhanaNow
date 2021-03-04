import generateToken from "../utils/generateToken.js";

const authUserEmailAndPassword = (UserRepo) => async (email, password) => {
  const user = await UserRepo.findUserByEmail(email);

  if (user && (await user.matchPassword(password))) {
    return {
      _id: user._id,
      displayName: user.displayName,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    };
  } else {
    throw new Error("UserService: Invalid email or password");
  }
};

const UserService = (UserRepo) => {
  return {
    authUserEmailAndPassword: authUserEmailAndPassword(UserRepo),
  };
};

export default UserService;
