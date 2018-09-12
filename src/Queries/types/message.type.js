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
            type: new GraphQLNonNull(GraphQLString),
            description:'conteudo da mensagem'
        },
        conversationId: {
            type: new GraphQLNonNull(GraphQLInt),
            description:'Id da conversa'
        },
        authorId: {
            type: new GraphQLNonNull(GraphQLInt),
            description:'id do autor da mensagem'
        },
        receiverId: {
            type: new GraphQLNonNull(GraphQLInt),
            description:'id do destinatario da mensagem'
        },
    }
});

export default graphObj;