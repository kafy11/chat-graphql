import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList
} from 'graphql';

const graphObj = new GraphQLObjectType({
    name:"Interacoes",
    description:"Api de interacoes de usuario",
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            description:'id de identificacao'
        },
        user_id: {
            type: new GraphQLNonNull(GraphQLInt),
            description:'Usuário que fez interacao'
        },
        user_liked_id: {
            type: new GraphQLNonNull(GraphQLInt),
            description:'Usuário que recebeu a interacao'
        },
        type: {
            type: new GraphQLNonNull(GraphQLString),
            description:'Tipo de interacao (heart,block)'
        },
    }
});

export default graphObj;