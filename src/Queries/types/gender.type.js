import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList
} from 'graphql';

const graphObj = new GraphQLObjectType({
    name:"generos",
    description:"Objeto de generos cadastrar no sistema",
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            description:'id do genero'
        },
        type: {
            type: new GraphQLNonNull(GraphQLString),
            description:'Tipo do genero'
        },
    }
});

export default graphObj;