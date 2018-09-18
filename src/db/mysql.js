import Sequelize from 'sequelize';

import users from './models/users';
import likes from './models/likes';
import messages from './models/messages';
import participants from './models/participants';
import passwordresets from './models/passwordresets';
import configs from './models/configs';
import files from './models/files';

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
const File = Conn.define('files', files);
const Message = Conn.define('messages', messages, {
  charset: 'utf8mb4',
  collate: 'utf8mb4_bin'
});

User.hasOne(Config);
User.hasMany(File);
File.belongsTo(User);
Message.belongsTo(User, {as: 'author'});
Message.belongsTo(User, {as: 'receiver'});

export {User, Config, Like, Message};
export default Conn;