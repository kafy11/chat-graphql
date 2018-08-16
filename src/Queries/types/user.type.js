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
            type: new GraphQLNonNull(GraphQLInt),
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
            type:GraphQLFloat,
            description: 'Latitude do usuario'
        },
        lon: {
            type:GraphQLFloat,
            description: 'Longitude do usuario'
        },
        photo: {
            type: GraphQLString,
            description: 'Foto do usuario'
        }
    }
});

export default graphObj;