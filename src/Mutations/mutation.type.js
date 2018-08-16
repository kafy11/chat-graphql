import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLNonNull
} from 'graphql';

import AuthResolver from './Resolvers/auth.type';

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
        }
      }
    },
  });

  export default Mutation;