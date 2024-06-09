import mongoose from "mongoose";

export default async () => {
  try {
    const mongoClient = await mongoose.connect(process.env.MONGO_URI);
    console.log(
      `contected to ${mongoClient.connection.host} on port:${mongoClient.connection.port} using ${mongoClient.connection.db.databaseName} database`
    );
  } catch (error) {
    console.log("database connection error: ", error);
  }
};

