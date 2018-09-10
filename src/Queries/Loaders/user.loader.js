import {User, Config} from '../../db/mysql';

import sequelize from 'sequelize';

const fetch = {
    fetchAll: async function (args, res){
        const filter = {};
        
        return User.findAll({where:args});
    },

    feed: async function (args){
        return await User.findById(args.id, {
            include: [{
                model: Config,
            }]
        }).then(user=>{
            const location = sequelize.literal(`ST_GeomFromText('POINT(${user.location.coordinates[0]} ${user.location.coordinates[1]})', 4326)`);
            return User.findAll({
                attributes: {include: [[sequelize.fn('ST_Distance', sequelize.literal('location'), location),'distance']] },
                order: [sequelize.col('distance')],
                limit: args.limit,
                offset: args.offset,
                where: {
                    $and: [
                        {id:{[sequelize.Op.ne]:args.id}},
                        sequelize.where(sequelize.fn('timestampdiff', sequelize.literal('year'), sequelize.col('age'), sequelize.fn('now')), {[sequelize.Op.between]: [6, 50]})
                    ],
                },
                include:[
                    {
                        model: Config,
                        where: {
                            interest: user.config.interest
                        }
                    }],
                }
            )
        })
    },

    flirtList: async function (args,res){
        const location = sequelize.literal(`ST_GeomFromText('POINT(${args.lat} ${args.long})', 4326)`);

        return User.findAll({
            attributes: {include: [[sequelize.fn('ST_Distance', sequelize.literal('location'), location),'distance']] },
            order: [sequelize.col('distance')],
            limit: 10,
            where: {id:{[sequelize.Op.ne]:args.id}}
          })
    }
}

export default fetch;