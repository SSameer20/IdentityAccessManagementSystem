import mongoose from "mongoose";

export const DBConnect = async (URI: string): Promise<void> => {
  try {
    mongoose.connect(URI);
  } catch (error) {
    throw new Error(`Error Connecting with DB ${error}`);
  }
};
