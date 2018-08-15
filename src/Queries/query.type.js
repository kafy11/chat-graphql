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
                password: {descripton:'senha do usuario',type: GraphQLString},
                email: {descripton:'email do usuario',type: GraphQLString},
                lat: {descripton:'latitude do usuario',type: GraphQLFloat},
                long: {descripton:'longitude do usuario',type: GraphQLFloat},
                photo: {description: 'foto do usuario', type: GraphQLString}
            },
            type: new GraphQLList(UserType),
            resolve: (root,args) => UserLoader.fetchAll(args)
        },
        login: {
            description: 'Login do usuario',
            args: {
                email: {descripton:'nome do usuario',type: GraphQLString},
                password: {descripton:'senha do usuario',type: GraphQLString},
            },
            type: new GraphQLList(UserType),
            resolve: (root, args) => UserLoader.login(args)
        }
    })
});

export default Query;