import { ApolloServer } from "apollo-server-express";
import schema from "../graphql/schema.js";

const apolloServer = new ApolloServer({
  schema,
  context: ({ req, res }) => ({ req, res }),
});
export default apolloServer;
