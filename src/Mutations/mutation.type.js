import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull,
    GraphQLFloat,
    GraphQLInt
} from 'graphql';

import AuthResolver from './Resolvers/auth.type';
import UserResolver from './Resolvers/user.type';

import User from './../Queries/types/user.type';

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'API para criar, editar e deletar objetos',
    fields: () => {
      return{
        login: {
          type:User,
          args: {
            email: {type: new GraphQLNonNull(GraphQLString)},
            password: {type: new GraphQLNonNull(GraphQLString)}
          },
          resolve: async (_,args) => AuthResolver.login(args)
        },

        register: {
          type:User,
          args: {
            name: {type: new GraphQLNonNull(GraphQLString)},
            email: {type: new GraphQLNonNull(GraphQLString)},
            password: {type: new GraphQLNonNull(GraphQLString)}
          },
          resolve: async (_,args) => AuthResolver.register(args)
        },

        edit: {
          type:User,
          args: {
            id: {type: new GraphQLNonNull(GraphQLInt)},
            name: {type: GraphQLString}
          },
          resolve: async (_,args) => UserResolver.edit(args)
        },
        
      }
    },
  });

  export default Mutation;