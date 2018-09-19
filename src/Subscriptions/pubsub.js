import { PubSub } from 'graphql-subscriptions';

const pubsub = new PubSub();
export const MESSAGE_SUBSCRIPTION_TOPIC = 'newMessages';

export default pubsub;