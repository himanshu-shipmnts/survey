import mongoose from "mongoose";
import { SurveySchema } from "./survey.js";

const UserSchema = mongoose.Schema({
  email: {
    type: "String",
  },
  password: {
    type: "String",
  },
  surveys: [SurveySchema],
});

export default mongoose.model("User", UserSchema);
