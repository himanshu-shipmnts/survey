import jwt from "jsonwebtoken";
class AuthService {
  issue(userID) {
    const token = jwt.sign({ userID }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
    return token;
  }
  verify(accessToken) {
    return jwt.verify(accessToken, process.env.JWT_SECRET);
  }
}
export default AuthService;
