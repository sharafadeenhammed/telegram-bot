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

/*

  
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://simontope14:<password>@cluster0.vmnpy2r.mongodb.net/?retryWrites=true&w=majority";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);


*/
