import {User, Config} from '../../db/mysql';

import sequelize from 'sequelize';

const fetch = {
    fetchAll: async function (args, res){
        const filter = {};
        
        return User.findAll({where:args});
    },

    feed: async function (args){
        User.findById(args.id, {
            include: [{
                model: Config,
            }]
        }).then(user=>{
            User.findAll({
                include:[
                    {
                        model: Config, 
                        where: {
                            interest: user.config.interest
                        }
                    }]
                }
            ).then(users => {
                return users;
            })
        })
    },

    flirtList: async function (args,res){
        const location = sequelize.literal(`ST_GeomFromText('POINT(${args.lat} ${args.long})', 4326)`);
        
        return await User.findAll({
            attributes: {include: [[sequelize.fn('ST_Distance', sequelize.literal('location'), location),'distance']] },
            order: [sequelize.col('distance')],
            limit: 10,
            where: {id:{[sequelize.Op.ne]:args.id}}
          });
    }
}

export default fetch;