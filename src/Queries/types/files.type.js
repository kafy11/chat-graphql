import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString
} from 'graphql';

const graphObj = new GraphQLObjectType({
    name:"arquivos",
    description:"arquivos",
    fields: {
        id: {
            type: GraphQLInt,
            description:'Id do arquivo'
        },
        name: {
            type: GraphQLString,
            description: 'Nome do arquivo',
        },
        path: {
            type: GraphQLString,
            description: 'Local do arquivo',
        }
    }
});

export default graphObj;