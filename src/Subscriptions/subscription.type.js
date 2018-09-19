import {
  GraphQLObjectType,
} from 'graphql';
import pubsub, { MESSAGE_SUBSCRIPTION_TOPIC } from './pubsub';
import Message from '../Queries/types/message.type';

const Subscription = new GraphQLObjectType({
  name: 'Subscription',
  description: 'Websocket para atualizar real-time os dados',
  fields: () => ({
      newMessages: {
        type:Message,
        args: {},
        resolve: async (_,args) => pubsub.asyncIterator(MESSAGE_SUBSCRIPTION_TOPIC)
      },
  }),
});

export default Subscription;