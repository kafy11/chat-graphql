import {
    GraphQLObjectType,
    GraphQLBoolean,
    GraphQLString
} from 'graphql';

const graphObj = new GraphQLObjectType({
    name:"arquivos",
    description:"arquivos",
    fields: {
        id: {
            type: GraphQLBoolean,
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