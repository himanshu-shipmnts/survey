import bcrypt from "bcryptjs";
import { User } from "../../../models/index.js";
import AuthService from "../../../services/AuthService.js";

const userMutations = {
  login: async (_, { email, password }, { res }) => {
    const user = await User.findOne({ email });
    // find user
    if (!user) {
      throw new Error("Not able to find User with given Id Plz try Again");
    }

    // check for password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new Error("Password Invalid, Plz try Again");
    }
    const token = new AuthService().issue(user._id);
    res.cookie("token", token);
    return user;
  },
  register: async (_, { email, password }) => {
    // check if already email exist then we can not register again
    const emailAlreadyExist = await User.findOne({ email });
    if (emailAlreadyExist) {
      throw new Error("User Alreday Exsist");
    }

    // encrypt password
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      email,
      password: hashPassword,
      survey: [],
    });
    let user;
    try {
      user = await newUser.save();
    } catch (err) {
      throw new Error(err);
    }

    return true;
  },
};

export default userMutations;
