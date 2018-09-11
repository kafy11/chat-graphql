import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList
} from 'graphql';


const graphObj = new GraphQLObjectType({
    name:"configuracao_usuario",
    description:"Objeto de configuração dos usuarios",
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            description:'id da configuração do usuario'
        },
        interest: {
            type: new GraphQLNonNull(GraphQLString),
            description:'Interesse do usuário (Homem, Mulher ou Ambos)'
        },
        userId: {
            type: new GraphQLNonNull(GraphQLInt),
            description:'id do usuario'
        }
    }
});

export default graphObj;