import Sequelize from 'sequelize';

import users from './models/users';
import likes from './models/likes';
import messages from './models/messages';
import conversations from './models/conversations';
import participants from './models/participants';
import passwordresets from './models/passwordresets';
import configs from './models/configs';

const Conn = new Sequelize(
    'beach_paquera',
    'root',
    'root',
    {
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,

      dialectOptions: {
        socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
      },

      /*pool: {
        max: 5,
        min: 0,
        idle: 10000
      }*/
      
      
    }
  );

  
const UserIndexes = {
  indexes: [
    {fields: ["location"],"name":"geo index"}
  ]
};
const User = Conn.define('users',users,UserIndexes);
const Config = Conn.define('configs', configs);
const Like = Conn.define('likes', likes);
const Conversation = Conn.define('conversations', conversations);
const Message = Conn.define('messages', messages);

User.hasOne(Config);
// User.belongsToMany(User, {through: Conversation, as: 'user2'});
// User.belongsToMany(User, {through: Message, as: 'receiver', foreignKey: 'author'});
Conversation.belongsTo(User, {as: 'participant'});
Conversation.belongsTo(User, {as: 'participant2'});
// User.hasMany(Conversation, {as:'participant'});
// User.hasMany(Conversation, {as:'participant2'});
Conversation.hasMany(Message);
Message.belongsTo(User, {as: 'author'});
Message.belongsTo(User, {as: 'receiver'});

export {User, Config, Conversation, Like, Message};
export default Conn;