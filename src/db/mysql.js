import Sequelize from 'sequelize';

import users from './models/users';
import likes from './models/likes';
import matchs from './models/matchs';
import unmatchs from './models/unmatchs';
import messeges from './models/messeges';
import conversations from './models/conversations';
import participants from './models/participants';
import genders from './models/genders';
import interested_in_gender from './models/interested_in_gender';
import ageranges from './models/ageranges';
import passwordresets from './models/passwordresets';

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

  
// const Plan = Conn.define('plans',plans);
// const Company = Conn.define('companies',companies);
// const CompanyConfig = Conn.define('company_config',company_config);

// const Gift = Conn.define('gifts',gifts);
const User = Conn.define('users',users);
const Like = Conn.define('likes', likes);
const Match = Conn.define('matchs', matchs);
const Unmatch = Conn.define('unmatchs', unmatchs);
const Gender = Conn.define('genders', genders);
const Conversation = Conn.define('conversations', conversations);
// const Event = Conn.define('events',events);
// const EventInvite = Conn.define('event_invites',event_invites);
// const CompanyGift = Conn.define('company_gifts',company_gifts);
// const EventEarnedPrize = Conn.define('event_earned_prizes',event_earned_prizes);

User.belongsTo(Gender);
User.interest = User.belongsToMany(Gender, { through: 'interestedGender' });
User.hasMany(Conversation);
// Plan.hasOne(Company,{onDelete: 'CASCADE'});
// CompanyConfig.hasOne(Company,{'onDelete':'CASCADE'});
// User.hasOne(Event,{onDelete: 'CASCADE'});
// EventInvite.belongsTo(Event,{onDelete:'CASCADE'});
// EventEarnedPrize.belongsTo(Event,{onDelete:'CASCADE'});
// EventEarnedPrize.belongsTo(CompanyGift,{onDelete:'CASCADE'});
// CompanyGift.belongsTo(Gift,{onDelete:'CASCADE'});
// Event.belongsTo(Company,{onDelete:'CASCADE'});


export {User, Gender, Like, Match, Unmatch};
export default Conn;