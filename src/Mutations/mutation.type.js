import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLFloat,
    GraphQLInt
} from 'graphql';

var Mutation = new GraphQLObjectType({
    name: 'ArticleGraph Mutations',
    description: 'These are the things we can change',
    fields: () => ({
      login: {
        description: 'Login',
        args: {
          email: { descripton:'email unico do usuario',type: GraphQLString}
        },
        resolve: (args) => AuthResolver.login(args)
      },
      register: {
        description: 'Registrar usuario',
        args: {
          id: { type: new GraphQLNonNull(GraphQLInt) }
        },
        resolve: (args) => AuthResolver.login(args)
      }
    }),
  });