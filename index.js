import express from "express";
import cors from "cors";

// highlight start
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import schemaCollection from "./src/graphql/schema/index.schema.js";
import resolversCollection from "./src/graphql/resolvers/index.resolvers.js";
import { connectDB } from "./src/config/db.js";

// highlight end

const port = process.env.PORT || 4000;
const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
    optionsSuccessStatus: 200,
  })
);
app.use(express.json());

const server = new ApolloServer({
  typeDefs: schemaCollection,
  resolvers: resolversCollection,
});

// Connect to the database
connectDB();

await server.start();
//highlight-start
app.use("/graphql", cors(), express.json(), expressMiddleware(server));
//highlight-end

app.listen(port, () => {
  console.log(`🚀 Server is on ${port}`);
});
