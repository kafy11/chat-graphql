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
            // console.log(user.location.coordinates[0])
            // const location = sequelize.literal(`ST_GeomFromText('POINT(${user.location.coordinates[0]} ${user.location.coordinates[1]})', 4326)`);
            // console.log(location)
            User.findAll({
                // attributes: {include: [[sequelize.fn('ST_Distance', sequelize.literal('location'), location),'distance']] },
                // order: [sequelize.col('distance')],
                // limit: 10,
                include:[
                    {
                        model: Config, 
                        where: {
                            interest: user.config.interest
                        }
                    }],
                }
            ).then(users => {
                console.log(users)
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