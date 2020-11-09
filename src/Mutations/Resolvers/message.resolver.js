import { Message } from '../../db/sqlite';

const MessageResolver = {
    deleteMessage: async function(args){
        const message = await Message.findById(args.id);
        return message.destroy({ force: true });
    },

    addMessage: async function (args){
        return await Message.create(args);
    }
}

export default MessageResolver;
