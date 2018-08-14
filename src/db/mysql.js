import Sequelize from 'sequelize';

import plans from './models/plans';
import companies from './models/companies';
import company_config from './models/company_config';
import users from './models/users';
import events from './models/events';
import event_invites from './models/event_invites';
import gifts from './models/gifts';
import company_gifts from './models/company_gifts';
import event_earned_prizes from './models/event_earned_prizes';

const Conn = new Sequelize(
    'beach_paquera',
    'root',
    '',
    {
      dialect: 'mysql',
      host: 'localhost',


      /*pool: {
        max: 5,
        min: 0,
        idle: 10000
      }*/
    }
  );

  
const Plan = Conn.define('plans',plans);
const Company = Conn.define('companies',companies);
const CompanyConfig = Conn.define('company_config',company_config);

const Gift = Conn.define('gifts',gifts);
const User = Conn.define('users',users);
const Event = Conn.define('events',events);
const EventInvite = Conn.define('event_invites',event_invites);
const CompanyGift = Conn.define('company_gifts',company_gifts);
const EventEarnedPrize = Conn.define('event_earned_prizes',event_earned_prizes);

Plan.hasOne(Company,{onDelete: 'CASCADE'});
CompanyConfig.hasOne(Company,{'onDelete':'CASCADE'});
User.hasOne(Event,{onDelete: 'CASCADE'});
EventInvite.belongsTo(Event,{onDelete:'CASCADE'});
EventEarnedPrize.belongsTo(Event,{onDelete:'CASCADE'});
EventEarnedPrize.belongsTo(CompanyGift,{onDelete:'CASCADE'});
CompanyGift.belongsTo(Gift,{onDelete:'CASCADE'});
Event.belongsTo(Company,{onDelete:'CASCADE'});


export {Plan,Company,CompanyConfig,Gift,User,Event,EventInvite,CompanyGift,EventEarnedPrize};
export default Conn;