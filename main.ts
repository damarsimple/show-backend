import { User } from "@prisma/client";
import { ApolloServer } from "apollo-server";
import { context } from "./context";
import { verifyJWT } from "./jwt";

import { schema } from "./schema";

export const server = new ApolloServer({
  //@ts-ignore
  schema,
  context: async ({ req }) => {
    const token = req.headers.authorization || "";
    if (!token) return context;

    // Try to retrieve a user with the token
    const user = (await verifyJWT(token)) as User | undefined;

    return {
      ...context,
      user,
    };
  },
});

server.listen().then(({ url }) => {
  console.log(`🚀 Server ready at ${url}`);
});
