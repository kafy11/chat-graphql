import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt
} from 'graphql';

import UserType from './user.type';
import UserLoader from '../Loaders/user.loader';

const MessageType = new GraphQLObjectType({
    name: "Conversation",
    description: "API de chat de usuario",
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            description:'ID da mensagem'
        },
        content: {
            type: new GraphQLNonNull(GraphQLString),
            description:'Conteúdo da mensagem'
        },
        author: {
            type: new GraphQLNonNull(UserType),
            description: 'autor da mensagem',
            resolve: ({ senderId: id }) => UserLoader.find({ id })
        },
        receiver: {
            type: new GraphQLNonNull(UserType),
            description:'destinatario da mensagem',
            resolve: ({ receiverId: id }, args) => UserLoader.find({ id })
        },
        chatId: {
            type: new GraphQLNonNull(GraphQLInt),
            description:'ID do chat'
        },
    }
});

export default MessageType;
