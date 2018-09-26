import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList
} from 'graphql';

import UserType from './user.type';
import UserLoader from '../Loaders/user.loader'

const graphObj = new GraphQLObjectType({
    name:"Chat",
    description:"Api de chat de usuario",
    fields: {
        id: {
            type: GraphQLInt,
            description:'id do chat'
        },
        sender: {
            type: new GraphQLNonNull(UserType),
            description:'Participante da conversa',
            resolve: (parentValue, args) => UserLoader.fetch({ id: parentValue.sender })
        },
        receiver: {
            type: new GraphQLNonNull(UserType),
            description:'Participante da conversa',
            resolve: (parentValue, args) => UserLoader.fetch({ id: parentValue.receiver })
        },
        createdAt: {
            type: GraphQLString, 
            description: 'data que a conversa foi iniciada'
        },
    }
});

export default graphObj;