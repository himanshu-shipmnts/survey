import { gql } from "apollo-server-express";
import resolvers from "./resolvers/index.js";
import { makeExecutableSchema } from "@graphql-tools/schema";

let typeDefs = gql`
  type Option {
    _id: String!
    name: String!
    count: Int!
  }

  type Question {
    _id: String!
    title: String!
    options: [Option!]!
  }

  type Survey {
    _id: String!
    title: String!
    questions: [Question!]!
  }

  type OptionWithoutCount {
    _id: String!
    name: String!
  }

  type QuestionWithoutCount {
    _id: String!
    title: String!
    options: [OptionWithoutCount!]!
  }

  type SurveyWithoutCount {
    _id: String!
    title: String!
    questions: [QuestionWithoutCount!]!
  }

  type User {
    email: String!
    surveys: [Survey]!
  }

  input OptionInputType {
    name: String!
    count: Int
  }

  input QuestionInputType {
    title: String!
    options: [OptionInputType!]
  }

  input SurveyInputType {
    title: String!
    questions: [QuestionInputType!]!
  }

  input SubmitQuestionInputType {
    questionId: String!
    optionId: String!
  }

  input SubmitSurveyInputType {
    surveyId: String!
    questions: [SubmitQuestionInputType!]!
  }

  type Query {
    getSurvey(surveyId: String!): SurveyWithoutCount
    getResult(surveyId: String!): Survey
  }

  type Mutation {
    register(email: String!, password: String!): Boolean!
    login(email: String!, password: String!): User
    createSurvey(survey: SurveyInputType!): Boolean!
    submitSurvey(survey: SubmitSurveyInputType!): Boolean!
    convertToThumbnail(url: String!): String
  }
`;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
