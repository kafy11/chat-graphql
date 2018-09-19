import { GraphQLUpload } from 'apollo-upload-server';

import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLNonNull,
  GraphQLFloat,
  GraphQLInt,
} from 'graphql';

import AuthResolver from './Resolvers/auth.resolver';
import UserResolver from './Resolvers/user.resolver';
import LikeResolver from './Resolvers/like.resolver';
import MessageResolver from './Resolvers/message.resolver';
import UploadResolver from './Resolvers/upload.resolver';


import User from './../Queries/types/user.type';
import UserConfig from './../Queries/types/userConfig.type';
import Like from '../Queries/types/like.type';
import Message from '../Queries/types/message.type';
import FileType from '../Queries/types/files.type';

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
          name: {type: GraphQLString},
          date_birthday: {type: GraphQLString},
          bio: {type: GraphQLString},
          gender: {type: GraphQLString},
          visible: {type: GraphQLInt},
        },
        resolve: async (_,args) => UserResolver.edit(args)
      },
      
      config: {
        type:UserConfig,
        args: {
          id: {type: new GraphQLNonNull(GraphQLInt)},
          interest: {type: GraphQLString},
          age_from: {type: GraphQLInt},
          age_to: {type: GraphQLInt},
        },
        resolve: async (_,args) => UserResolver.config(args)
      },
      
      interest: {
        type:User,
        args: {
          id: {type: new GraphQLNonNull(GraphQLInt)},
          gender: {type: new GraphQLNonNull(GraphQLString)},
        },
        resolve: async (_,args) => UserResolver.interest(args)
      },
      
      userInteraction: {
        type: Like,
        args: {
          user_id: {type: new GraphQLNonNull(GraphQLInt)},
          user_liked_id: {type: new GraphQLNonNull(GraphQLInt)},
          type: {type: new GraphQLNonNull(GraphQLString)}
        },
        resolve: async (root,args) => LikeResolver.interaction(args)
      },

      deleteMessage: {
        type: Message,
        args:{
          id: {type: new GraphQLNonNull(GraphQLInt)},
        },
        resolve: async (root,args) => MessageResolver.deleteMessage(args)
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

      singleUpload: {
        type: FileType,
        args:{
          image: {type: GraphQLUpload},
        },
        resolve: async (_, args) => UploadResolver.singleUpload(args)
      }

    }
  },
});

export default Mutation;