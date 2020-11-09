import Sequelize from 'sequelize';

import userModel from './models/user';
import chatModel from './models/chat';
import messageModel from './models/message';

const Conn = new Sequelize({
  dialect: 'sqlite',
  storage: 'chat.db'
});

const User = Conn.define('users', userModel);
const Chat = Conn.define('chats', chatModel);
const Message = Conn.define('messages', messageModel);

Chat.belongsTo(User, { as: 'participant1' });
Chat.belongsTo(User, { as: 'participant2' });
Chat.hasMany(Message);
Message.belongsTo(User, { as: 'sender' });
Message.belongsTo(User, { as: 'receiver' });

export { User, Chat, Message };
export default Conn;