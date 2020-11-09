import {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLList
} from 'graphql';

import UserType from './user.type';
import UserLoader from '../Loaders/user.loader'

const ChatType = new GraphQLObjectType({
    name: "Chat",
    description: "API de chat de usuario",
    fields: {
        id: {
            type: GraphQLInt,
            description:'ID do chat'
        },
        participants: {
            type: new GraphQLList(UserType),
            description: 'Participante da conversa',
            resolve: async ({ dataValues }) => {
                const { participant1Id, participant2Id } = dataValues;

                const user1 = await UserLoader.fetch({ id: participant1Id });
                const user2 = await UserLoader.fetch({ id: participant2Id });
                return [user1, user2];
            }
        }
    }
});

export default ChatType;