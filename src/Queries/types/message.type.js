import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList
} from 'graphql';

const graphObj = new GraphQLObjectType({
    name:"Conversation",
    description:"Api de chat de usuario",
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            description:'id da mensagem'
        },
        content: {
            type: new GraphQLNonNull(GraphQLInt),
            description:'conteudo da mensagem'
        },
        conversationId: {
            type: new GraphQLNonNull(GraphQLInt),
            description:'Id da conversa'
        }
    }
});

export default graphObj;