import logger from './utils/logger';
import { ApolloServer } from "apollo-server";
import { GraphQLSchema } from "graphql";
import { mergeSchemas } from "graphql-tools";
import schemas from "./schema";
import resolvers from './resolvers';

const schema: GraphQLSchema = mergeSchemas({
	schemas,
	resolvers
});

// GraphQL
const server = new ApolloServer({
	schema,
	context: async ({ req }: any) => {
		if (!req || !req.headers) {
			logger.info('no request');
			return;
		}
	},
	tracing: true
});

server.listen().then(({ url }) => {
	console.log(`🚀 Server ready at ${url}`);
});