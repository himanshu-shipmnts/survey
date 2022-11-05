import { User } from "../../../models/index.js";
import Jimp from "jimp";

const surveyMutations = {
  createSurvey: async (_, args, { req }) => {
    if (!req.userId) {
      throw new Error("User not LogedIn, Plz Login First to Access APIS");
    }
    let updatedUser;
    try {
      // push survey array to user's surveys
      updatedUser = await User.updateOne(
        { _id: req.userId },
        { $push: { surveys: args.survey } }
      );
    } catch (err) {
      throw new Error(err);
    }

    if (updatedUser) {
      return true;
    }
    return false;
  },
  submitSurvey: async (_, args) => {
    const user = await User.find({
      surveys: { $elemMatch: { _id: args.survey.surveyId } },
    });
    if (!user || user.length === 0) {
      throw new Error("Not able to find survey, plz try again");
    }

    const surveys = user[0].surveys;
    //find survey from user's survey and increase counter of option
    const survey = surveys.find(
      (sur) => sur._id.toString() === args.survey.surveyId
    );

    if (!survey) {
      throw new Error("Survey not Found, plz try again");
    }
    survey.questions = survey.questions.map((question) => {
      const updatedQue = args.survey.questions.find((que) => {
        return que.questionId === question._id.toString();
      });
      return {
        ...question,
        options: question.options.map((op) => {
          return {
            ...op,
            count:
              op._id.toString() === updatedQue?.optionId
                ? op.count + 1
                : op.count,
          };
        }),
      };
    });
    let updatedUser;
    try {
      updatedUser = await User.updateOne(
        { _id: user[0]._id, "surveys._id": args.survey.surveyId },
        { $set: { "surveys.$": survey } }
      );
    } catch (err) {
      throw new Error(err);
    }

    if (updatedUser) {
      return true;
    }
    return false;
  },
  convertToThumbnail: async (_, args, { req }) => {
    if (!req.userId) {
      throw new Error("User not LogedIn, Plz Login First to Access APIS");
    }
    const url = args.url;

    let photo;
    try {
      photo = await Jimp.read(url);
    } catch (err) {
      throw new Error(err);
    }

    if (!photo) {
      throw new Error("Image Url doesn't contains image, Plz try Again");
    }

    //convert image to 50x50 and base64 using Jimp
    let contentHtml;
    photo.resize(50, 50).getBase64(Jimp.AUTO, function (e, img64) {
      if (e) {
        throw e;
      }
      contentHtml = '<img src="' + img64 + '">';
    });
    if (!contentHtml) {
      return null;
    }
    return contentHtml;
  },
};

export default surveyMutations;
