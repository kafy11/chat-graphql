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
        userId: {
            type: new GraphQLNonNull(GraphQLInt),
            description:'Usuário que enviou a mensagem'
        },
        user2Id: {
            type: new GraphQLNonNull(GraphQLInt),
            description:'Usuário que recebeu a mensagem'
        },
    }
});

export default graphObj;