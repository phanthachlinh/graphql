"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const { ApolloServer, gql } = require('apollo-server');
const { ApolloGateway } = require("@apollo/gateway");
// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const gateway = new ApolloGateway({
    serviceList: [
        { name: 'accounts', url: 'http://localhost:8888' },
        { name: 'mysql', url: 'http://localhost:8889/graphql' },
    ],
});
const MongoUrl = 'http://localhost:8001/user';
const typeDefs = gql `
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  type User {
    ID: Int
    username: String
    isManager:Boolean
  }
  type ClientResponse{
      count:Int
      results:string
  }

  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "books" query returns an array of zero or more Books (defined above).
  type Query {
    users: [User]
    validateUser(username:String,password:String): User
    getClients(searchTerm:String):[ClientResponse]
  }
`;
const resolvers = {
    Query: {
        users: (_, __, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () { return yield dataSources.userAPI.getUsers(); }),
        validateUser: (_, args, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () { console.log(args); return dataSources.userAPI.validateUser(args.username, args.password); }),
        getClients: (_, args, { dataSources }) => __awaiter(void 0, void 0, void 0, function* () { console.log(args); return dataSources.clientAPI.getClients(args.searchTerm); })
    },
};
const server = new ApolloServer({
    gateway,
    subscriptions: false,
});
// The `listen` method launches a web server.
server.listen(4002).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});
