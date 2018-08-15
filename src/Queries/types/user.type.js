import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList
} from 'graphql';

const graphObj = new GraphQLObjectType({
    name:"usuarios",
    description:"Objeto de usuarios cadastrar no sistema",
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description:'id do usuario'
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description:'Nome do usuario'
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
            description:'Email padrao do usuario'
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Senha do usuario'
        },
        lat: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: 'Latitude do usuario'
        },
        long: {
            type: new GraphQLNonNull(GraphQLFloat),
            description: 'Longitude do usuario'
        },
        photo: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Foto do usuario'
        }
    }
});

export default graphObj;