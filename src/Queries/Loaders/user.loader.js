import {User, Config, Conversation} from '../../db/mysql';

import sequelize from 'sequelize';

const fetch = {
    fetchAll: async function (args, res){
        let filter = {};
        for(let f in args){
            if(args[f] != undefined){
                filter[f] = args[f];
            }
        }
        
        return User.findAll({where:filter});
    },
    
    feed: async function (args){
        return await User.findById(args.id, {
            include: [{
                model: Config,
            }]
        }).then(user=>{
            const location = sequelize.literal(`ST_GeomFromText('POINT(${args.lat} ${args.long})', 4326)`);
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
    },
    
    conversations: async function (args){
        return await Conversation.findAll({
            where: {
                userID: args.id,
            }
        })
    },
    
    config: async function(args,res){
        return Config.findAll({
            where: {userId:args.id},
            limit: 1
        });
    }
}

export default fetch;