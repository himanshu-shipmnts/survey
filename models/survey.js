import mongoose from "mongoose";
import { QuestionSchema } from "./question.js";

export const SurveySchema = mongoose.Schema({
  title: {
    type: "String",
  },
  questions: [QuestionSchema],
});
