import UserConfigType from './types/userConfig.type';
import UserType from './types/user.type';
import MessageType from './types/message.type';
import UserLoader from './Loaders/user.loader';
import ConversationLoader from './Loaders/conversation.loader';

import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLFloat,
    GraphQLInt,
    GraphQLNonNull
} from 'graphql';

const Query = new GraphQLObjectType({
    name:'Query',
    description:'Query para interação com a api do sistema de beach paquera',
    fields: () => ({
        users: {
            description:'Busca de Usuarios',
            args: {
                id: {descripton:'ID unico do usuario',type: GraphQLInt},
                name: {descripton:'nome do usuario',type: GraphQLString},
                email: {descripton:'email do usuario',type: GraphQLString},
            },
            type: new GraphQLList(UserType),
            resolve: (root,args) => UserLoader.fetchAll(args)
        },
        feed: {
            description: 'Feed do usuario',
            args: {
                id: {descripton:'Id do usuario logado',type: GraphQLInt},
                limit: {descripton:'Usuarios por pagina',type: GraphQLInt},
                offset: {descripton:'Pagina a ser exibida',type: GraphQLInt},
                lat: {descripton:'Latitude do usuario logado',type: new GraphQLNonNull(GraphQLFloat)},
                long: {descripton:'Longitude do usuario logado',type: new GraphQLNonNull(GraphQLFloat)}
            },
            type: new GraphQLList(UserType),
            resolve: (_, args) => UserLoader.feed(args)
        },
        flirtList: {
            description: 'Lista usuário próximos por geolocalização',
            args: {
                id: {descripton:'id do usuario logado',type: GraphQLInt},
                lat: {descripton:'Latitude do usuario logado',type: GraphQLFloat},
                long: {descripton:'Longitude do usuario logado',type: GraphQLFloat},
            },
            type: new GraphQLList(UserType),
            resolve: (root, args) => UserLoader.flirtList(args)
        },
        conversations: {
            description: 'Conversas do usuario',
            args: {
                id: {descripton:'Id da conversa',type: GraphQLInt},
                name: {description: 'Nome do usuario da conversa', type: GraphQLString}
            },
            type: new GraphQLList(UserType),
            resolve: (_, args) => ConversationLoader.conversations(args)
        },
        messages: {
            description: 'Id da conversa',
            args: {
                id: {description: 'Id da conversa', type: GraphQLInt}
            },
            type: new GraphQLList(MessageType),
            resolve: (root, args) => ConversationLoader.mensagens(args),

        },
        userConfig: {
            description: 'Configuração de um usuario',
            args: {
                id: {descripton:'id do usuario',type: GraphQLInt}
            },
            type: new GraphQLList(UserConfigType),
            resolve: (root, args) => UserLoader.config(args)
        }
    })
});

export default Query;