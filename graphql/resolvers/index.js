import { userMutations } from "./user/index.js";
import { surveyMutations, surveyQueries } from "./survey/index.js";

const resolvers = {
  Query: {
    ...surveyQueries,
  },
  Mutation: {
    ...userMutations,
    ...surveyMutations,
  },
};

export default resolvers;
