import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList
} from 'graphql';
import UserType from './user.type';
import UserLoader from '../Loaders/user.loader';

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
        createdAt: {
            type: GraphQLString, 
            description: 'data que a mensagem foi enviada'
        },
        author: {
            type: new GraphQLNonNull(UserType),
            description:'autor da mensagem',
            resolve: (parentValue, args) => UserLoader.find({ id: parentValue.senderId })
        },
        receiver: {
            type: new GraphQLNonNull(UserType),
            description:'destinatario da mensagem',
            resolve: (parentValue, args) => UserLoader.find({ id: parentValue.receiverId })
        },
        chatId: {
            type: new GraphQLNonNull(GraphQLInt),
            description:'id do chat'
        },
    }
});

export default graphObj;
