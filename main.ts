import { ApolloServer } from "apollo-server";
import { context } from "./context";

import { schema } from "./schema";

export const server = new ApolloServer({
  //@ts-ignore
  schema,
  context,
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});