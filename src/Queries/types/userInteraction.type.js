import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList
} from 'graphql';

const graphObj = new GraphQLObjectType({
    name:"interacao",
    description:"Api de interacoes de usuario",
    fields: {
        heart: {
            type: GraphQLInt,
            description:'Se houve curtida'
        }
    }
});

export default graphObj;