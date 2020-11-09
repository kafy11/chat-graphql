import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLInt,
} from 'graphql';

import UserResolver from './Resolvers/user.resolver';
import MessageResolver from './Resolvers/message.resolver';
import ChatResolver from './Resolvers/chat.resolver';

import User from './../Queries/types/user.type';
import Chat from './../Queries/types/chat.type';
import Message from '../Queries/types/message.type';

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  description: 'API para criar, editar e deletar objetos',
  fields: () => ({
    edit: {
      type: User,
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt)},
        name: {type: GraphQLString},
        email: {type: GraphQLString}
      },
      resolve: async (root, args) => UserResolver.edit(args)
    },

    addUser: {
      type: User,
      args: {
        name: {type: new GraphQLNonNull(GraphQLString)},
        email: {type: new GraphQLNonNull(GraphQLString)}
      },
      resolve: async (root, args) => UserResolver.addUser(args)
    },

    addChat: {
      type: Chat,
      args: {
        sender: {type: new GraphQLNonNull(GraphQLInt)},
        receiver: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve: async (root, args) => ChatResolver.addChat(args)
    },

    deleteMessage: {
      type: Message,
      args: {
        id: {type: new GraphQLNonNull(GraphQLInt)},
      },
      resolve: async (root, args) => MessageResolver.deleteMessage(args)
    },

    addMessage: {
      type: Message,
      args:{
        content: {type: new GraphQLNonNull(GraphQLString)},
        authorId: {type: new GraphQLNonNull(GraphQLInt)},
        receiverId: {type: new GraphQLNonNull(GraphQLInt)}
      },
      resolve: async (root, args) => MessageResolver.addMessage(args)
    },
  })
});

export default Mutation;