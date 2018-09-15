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
        author: {
            type: new GraphQLNonNull(UserType),
            description:'autor da mensagem',
            resolve: (parentValue, args) => UserLoader.fetch({ id: parentValue.authorId })
        },
        receiver: {
            type: new GraphQLNonNull(UserType),
            description:'destinatario da mensagem',
            resolve: (parentValue, args) => UserLoader.fetch({ id: parentValue.receiverId })
        },
    }
});

export default graphObj;