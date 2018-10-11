import UserConfigType from './types/userConfig.type';
import UserType from './types/user.type';
import MessageType from './types/message.type';
import FileType from './types/files.type';
import ChatType from './types/chat.type';

import UserLoader from './Loaders/user.loader';
import ConversationLoader from './Loaders/conversation.loader';
import FileLoader from './Loaders/file.loader';
import ChatLoader from './Loaders/chat.loader';

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
        user: {
            description:'Busca de Usuarios',
            args: {
                id: {description:'ID unico do usuario',type: GraphQLInt},
            },
            type: UserType,
            resolve: (root,args) => UserLoader.fetch(args)
        },
        users: {
            description:'Busca de Usuarios',
            args: {
                id: {description:'ID unico do usuario',type: GraphQLInt},
                name: {description:'nome do usuario',type: GraphQLString},
                email: {description:'email do usuario',type: GraphQLString},
            },
            type: new GraphQLList(UserType),
            resolve: (root,args) => UserLoader.fetchAll(args)
        },
        feed: {
            description: 'Feed do usuario',
            args: {
                id: {description:'Id do usuario logado',type: GraphQLInt},
                limit: {description:'Usuarios por pagina',type: GraphQLInt},
                offset: {description:'Pagina a ser exibida',type: GraphQLInt},
                lat: {description:'Latitude do usuario logado',type: new GraphQLNonNull(GraphQLFloat)},
                long: {description:'Longitude do usuario logado',type: new GraphQLNonNull(GraphQLFloat)}
            },
            type: new GraphQLList(UserType),
            resolve: (_, args) => UserLoader.feed(args)
        },
        flirtList: {
            description: 'Lista usuário próximos por geolocalização',
            args: {
                id: {description:'id do usuario logado',type: GraphQLInt},
                lat: {description:'Latitude do usuario logado',type: GraphQLFloat},
                long: {description:'Longitude do usuario logado',type: GraphQLFloat},
            },
            type: new GraphQLList(UserType),
            resolve: (root, args) => UserLoader.flirtList(args)
        },
         conversations: {
             description: 'Conversas do usuario',
             args: {
                 userId: {description:'Id do usuário logado',type: new GraphQLNonNull(GraphQLInt)},
                 name: {description: 'Nome do usuario da conversa', type: GraphQLString},
                 offsetMessage: {description: 'ID de mensagem para definir o offset da lista', type: GraphQLInt}
             },
             type: new GraphQLList(MessageType),
             resolve: (_, args) => ConversationLoader.conversations(args)
        },
        messages: {
            description: 'Mensagens de uma conversa',
            args: {
                ids: { description: 'Ids dos usuários', type: new GraphQLList(GraphQLInt) },
                offsetMessage: {description: 'ID de mensagem para definir o offset da lista', type: GraphQLInt}
            },
            type: new GraphQLList(MessageType),
            resolve: (root, args) => ConversationLoader.messages(args),
        },
        userConfig: {
            description: 'Configuração de um usuario',
            args: {
                id: {description:'id do usuario',type: GraphQLInt}
            },
            type: new GraphQLList(UserConfigType),
            resolve: (root, args) => UserLoader.config(args)
        },

        unreadConversations: {
            description: 'Pessoas que curtiram alguém mas não inicou uma conversa',
            args: {
                id: {description: 'id do usuário que recebeu as curtidas', type: GraphQLInt},
                page: {description: 'pagina que deseja acessar', type: GraphQLInt}
            },
            type: new GraphQLList(UserType),
            resolve: (root,args) => UserLoader.getUnreadConversations(args)
        },
        file: {
            description: 'Arquivos',
            args: {
                id: {description:'id do arquivo', type: GraphQLInt},
                userId: {description:'id do usuario autor do arquivo', type: GraphQLInt}
            },
            type: new GraphQLList(FileType),
            resolve: (root, args) => FileLoader.file(args)
        },
        file_type: {
            description: 'Pega os arquivos por usuário e tipo',
            args: {
                type: {description: 'tipo do arquivo (photo, video, audio)', type: GraphQLString},
                userId: {description:'id do usuario autor do arquivo', type: GraphQLInt}
            },
            type: new GraphQLList(FileType),
            resolve: (root, args) => FileLoader.files(args)
        },
        chat: {
            description: 'Conversas do usuario',
            args: {
                receiver: {description: 'Id do participante da conversa', type: GraphQLInt},
                sender: {description: 'Id do participante da conversa', type: GraphQLInt}
            },
            type: new GraphQLList(ChatType),
            resolve: (root, args) => ChatLoader.chat(args)
        }
    })
});

export default Query;