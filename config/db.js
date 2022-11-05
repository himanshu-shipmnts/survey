import mongoose from "mongoose";

let isConnected;
let dbObject;

const connectToMongoDb = async () => {
  if (isConnected) {
    // if already connect return dbObject
    return dbObject;
  }

  try {
    dbObject = await mongoose.connect(process.env.MONGO_URL);
    isConnected = dbObject.connections[0].readyState;

    if (isConnected) {
      console.log("Connnect to Database Successfully!");
    }

    return dbObject;
  } catch (err) {
    throw new Error(err);
  }
};

export default connectToMongoDb;
