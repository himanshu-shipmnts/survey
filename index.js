import express from "express";
import dotenv from "dotenv";
import apolloServer from "./config/apollo.js";
import connectToMongoDb from "./config/db.js";
import cookieParser from "cookie-parser";
import { User } from "./models/index.js";
import AuthService from "./services/AuthService.js";

const app = express();
dotenv.config();
const PORT = process.env.PORT;
const authService = new AuthService();
await connectToMongoDb();
await apolloServer.start();

app.use(cookieParser());
app.use((req, res, next) => {
  const token =
    req.cookies["token"] ||
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySUQiOiI2MzY1NmNmY2ExZDNmZTdhYzJlNjA2OTgiLCJpYXQiOjE2Njc2MjQyMTksImV4cCI6MTY2NzcxMDYxOX0.EYalG1JqWjEeGpVcL0M3Zd_TOe6lb7MaUP2ojTatsd0";
  if (!token) {
    next();
    return;
  }

  let tokenData;
  try {
    tokenData = authService.verify(token);
    req.userId = tokenData.userID;
    next();
    return;
  } catch (err) {
    console.error(err);
  }

  const user = User.find({ _id: tokenData.userId });
  if (!user) {
    next();
    return;
  }

  req.userId = tokenData.userId;
  const tokens = authService.issue(userId);
  res.cookie("token", tokens.accessToken);
  next();
});

apolloServer.applyMiddleware({
  app,
});

app.listen(PORT, () => {
  console.log("server is running on", PORT);
});
