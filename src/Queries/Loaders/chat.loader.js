import { Chat, Message } from '../../db/sqlite';

const ChatLoader = {
    fetch: async function ({ userId }){
        return await Chat.findAll({
            where: {
                $or: [
                    { participant1Id: userId },
                    { participant2Id: userId },
                ],
            }
        })
    },
    messages: async function ({ chatId, offsetMessage }){
        let where = { 
            chatId
        };

        if(offsetMessage) {
            where.id = { $lt: offsetMessage };
        }

        return await Message.findAll({
            order: [['id', 'DESC']],
            limit: 10,
            where 
        });
    },
}

export default ChatLoader;

