import UserType from './types/user.type';
import MessageType from './types/message.type';
import ChatType from './types/chat.type';

import UserLoader from './Loaders/user.loader';
import ChatLoader from './Loaders/chat.loader';

import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLNonNull,
    GraphQLInt
} from 'graphql';

const Query = new GraphQLObjectType({
    name: 'Query',
    description: 'Query para interação com a API',
    fields: () => ({
        getUsers: {
            description: 'Busca de usuários',
            args: {
                id: { description:'ID único do usuário', type: GraphQLInt },
                name: { description:'nome do usuário', type: GraphQLString },
                email: { description:'email do usuário', type: GraphQLString },
            },
            type: new GraphQLList(UserType),
            resolve: (root, args) => UserLoader.fetchAll(args)
        },
        getMessages: {
            description: 'Pega as mensagens de uma conversa',
            args: {
                chatId: { description: 'ID da conversa', type: new GraphQLNonNull(GraphQLInt) },
                offsetMessage: { description: 'ID de mensagem para definir o offset da lista', type: GraphQLInt }
            },
            type: new GraphQLList(MessageType),
            resolve: (root, args) => ChatLoader.messages(args),
        },
        getChats: {
            description: 'Pega as conversar de um usuário',
            args: {
                userId: { description: 'ID do usuário da conversa', type: new GraphQLNonNull(GraphQLInt) }
            },
            type: new GraphQLList(ChatType),
            resolve: (root, args) => ChatLoader.fetch(args)
        }
    })
});

export default Query;