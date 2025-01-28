import mongoose from "mongoose";

export const dbConnection = () => {
  mongoose
    .connect(process.env.MONGODB_URL, {
      dbName: "GRADIA",
    })
    .then(() => {
      console.log("connected to database");
    })
    .catch((error) => {
      console.log("Error occured while connecting");
    });
};
