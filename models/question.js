import mongoose from "mongoose";

const OptionSchema = mongoose.Schema({
  name: {
    type: "String",
  },
  count: {
    type: "Number",
    default: 0,
  },
});

export const QuestionSchema = mongoose.Schema({
  title: {
    type: "String",
  },
  options: { type: [OptionSchema], default: [{ name: "Yes" }, { name: "No" }] },
});
