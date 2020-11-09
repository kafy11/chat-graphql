import { Chat } from '../../db/sqlite';

const ChatResolver = {
    addChat: async function({ sender, receiver }){
        return await Chat.create({
            participant1Id: sender,
            participant2Id: receiver,
        });
    }
}

export default ChatResolver;
