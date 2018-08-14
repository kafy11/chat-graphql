import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList
} from 'graphql';

const graphObj = new GraphQLObjectType({
    name:"store",
    description:"Objeto de empresas cadastrar no sistema",
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLString),
            description:'id da empresa'
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description:'Razão social da empresa'
        },
        fantasy_name: {
            type: new GraphQLNonNull(GraphQLString),
            description:'Razão social da empresa'
        },
        cnpj: {
            type: new GraphQLNonNull(GraphQLInt),
            description:'CNPJ da empresa'
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
            description:'Email padrao da empresa'
        },
        address: {
            type: new GraphQLNonNull(GraphQLString),
            description:'Endereco fisico da empresa'
        },
    }
});

export default graphObj;