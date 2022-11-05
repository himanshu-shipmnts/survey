import { User } from "../../../models/index.js";

const surveyQueries = {
  getSurvey: async (_, args, { req }) => {
    if (!req.userId) {
      throw new Error("User not LogedIn, Plz Login First to Access APIS");
    }
    const surveyId = args.surveyId;

    // find user with given surveyId
    const userWithGivenSurvey = await User.find({
      surveys: { $elemMatch: { _id: surveyId } },
    });

    if (!userWithGivenSurvey || userWithGivenSurvey.length === 0) {
      throw new Error("Not able to find Survey, Plz try again");
    }

    //find survey from user
    const survey = userWithGivenSurvey[0].surveys.find(
      (survey) => survey._id.toString() === surveyId
    );

    //return survey
    if (survey) {
      return survey;
    }
    return null;
  },
  getResult: async (_, args, { req }) => {
    if (!req.userId) {
      throw new Error("User not LogedIn, Plz Login First to Access APIS");
    }
    const surveyId = args.surveyId;

    // find user with given surveyId
    const userWithGivenSurvey = await User.find({
      _id: req.userId,
      surveys: { $elemMatch: { _id: surveyId } },
    });

    if (!userWithGivenSurvey || userWithGivenSurvey.length === 0) {
      throw new Error("Not able to find Survey, Plz try again");
    }

    //find survey from user
    const survey = userWithGivenSurvey[0].surveys.find(
      (survey) => survey._id.toString() === surveyId
    );

    //return survey
    if (survey) {
      return survey;
    }
    return null;
  },
};

export default surveyQueries;
