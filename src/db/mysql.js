import Sequelize from 'sequelize';

import users from './models/users';
import likes from './models/likes';
import matchs from './models/matchs';
import unmatchs from './models/unmatchs';
import messages from './models/messages';
import conversations from './models/conversations';
import participants from './models/participants';
import genders from './models/genders';
import ageranges from './models/ageranges';

const Conn = new Sequelize(
    'beach_paquera',
    'root',
    'root',
    {
      dialect: 'mysql',
      host: 'localhost',
      port: 3306,

      // dialectOptions: {
      //   socketPath: "/Applications/MAMP/tmp/mysql/mysql.sock"
      // },

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
const Like = Conn.define('paqueras', likes);
const SuperLike = Conn.define('paqueras', superlikes);
const Match = Conn.define('paqueras', matchs);
const Unmatch = Conn.define('paqueras', unmatchs);
// const Event = Conn.define('events',events);
// const EventInvite = Conn.define('event_invites',event_invites);
// const CompanyGift = Conn.define('company_gifts',company_gifts);
// const EventEarnedPrize = Conn.define('event_earned_prizes',event_earned_prizes);

// Plan.hasOne(Company,{onDelete: 'CASCADE'});
// CompanyConfig.hasOne(Company,{'onDelete':'CASCADE'});
// User.hasOne(Event,{onDelete: 'CASCADE'});
// EventInvite.belongsTo(Event,{onDelete:'CASCADE'});
// EventEarnedPrize.belongsTo(Event,{onDelete:'CASCADE'});
// EventEarnedPrize.belongsTo(CompanyGift,{onDelete:'CASCADE'});
// CompanyGift.belongsTo(Gift,{onDelete:'CASCADE'});
// Event.belongsTo(Company,{onDelete:'CASCADE'});


export {User, Like, Match, Unmatch};
export default Conn;