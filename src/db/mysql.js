import Sequelize from 'sequelize';

import users from './models/users';
import likes from './models/likes';
import messeges from './models/messeges';
import conversations from './models/conversations';
import participants from './models/participants';
import passwordresets from './models/passwordresets';
import configs from './models/configs';

const Conn = new Sequelize(
    'beach_paquera',
    'root',
    '',
    {
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,

      dialectOptions: {
        // socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
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
const Messege = Conn.define('messeges', messeges);

User.hasOne(Config);
User.belongsToMany(User, {through: Conversation, as: 'user2'});
Conversation.hasMany(Messege);

export {User, Config, Conversation, Like};
export default Conn;