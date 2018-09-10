import UserType from './types/user.type';
import UserLoader from './Loaders/user.loader';

import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLFloat,
    GraphQLInt
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
                lat: {descripton:'Latitude do usuario logado',type: GraphQLFloat},
                long: {descripton:'Longitude do usuario logado',type: GraphQLFloat}
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
        }
    })
});

export default Query;