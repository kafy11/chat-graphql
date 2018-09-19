import { Message } from '../../db/mysql';
import pubsub, { MESSAGE_SUBSCRIPTION_TOPIC } from '../../Subscriptions/pubsub';

const result = {
    deleteMessage: async function(args){
        return Message.findById(args.id).then(message=>{
            return message.destroy({force: true});
        })
    },

    addMessage: async function (args){
        return Message.create(args).then(message =>{
            pubsub.publish(MESSAGE_SUBSCRIPTION_TOPIC, { message });
            return message;
        })
    }
}

export default result;
