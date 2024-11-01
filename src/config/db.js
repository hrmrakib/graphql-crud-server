import { MongoClient, ServerApiVersion } from "mongodb";

const uri = "mongodb://localhost:27017/";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
export const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let userCollection;

async function connectDB() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const db = client.db("graphql-crud");
    userCollection = db.collection("users");

    // Send confirm a successful connection
    console.log("MongoDB connected");
  } finally {
  }
}

export { connectDB, userCollection };
