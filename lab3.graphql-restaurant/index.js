import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import { resolvers } from './resolvers.js';
import { getUserFromAuthHeader } from './auth.js';

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  listen: { port: 4001 },
  context: async ({ req }) => {
    const authHeader = req.headers.authorization || '';
    const user = getUserFromAuthHeader(authHeader);
    return { user };
  },
});

console.log(`GraphQL API ресторану запущено за адресою: ${url}`);