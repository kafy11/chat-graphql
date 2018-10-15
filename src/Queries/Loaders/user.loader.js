import Conn, { User, Config, Like, Chat } from '../../db/mysql';

import sequelize from 'sequelize';

const fetch = {
    fetch: async function (args, res){
        let filter = {};
        for(let f in args){
            if(args[f] != undefined){
                filter[f] = args[f];
            }
        }
        
        return User.find({
            attributes: {
                include:[
                    [sequelize.fn('timestampdiff', sequelize.literal('YEAR'), sequelize.col('date_birthday'), sequelize.fn('NOW')),'age']
                ]
            },
            where:filter
        });
    },

    find: async function(args){
        return User.findById(args.id).then(result=>{return result});
    },

    fetchAll: async function (args, res){
        let filter = {};
        for(let f in args){
            if(args[f] != undefined){
                filter[f] = args[f];
            }
        }
        
        return User.findAll({
            attributes: {
                include:[
                    [sequelize.fn('timestampdiff', sequelize.literal('YEAR'), sequelize.col('date_birthday'), sequelize.fn('NOW')),'age']
                ]
            },
            where:filter
        });
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
                    gender: user.config.interest,
                    $and: [
                        {id:{[sequelize.Op.ne]:args.id}},
                        //sequelize.where(sequelize.fn('timestampdiff', sequelize.literal('year'), sequelize.col('age'), sequelize.fn('now')), {[sequelize.Op.between]: [6, 50]})
                    ],
                },
            })
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
    
    config: async function(args,res){
        return Config.findAll({
            where: {userId:args.id},
            limit: 1
        });
    },

    interaction: async function(args,res){

        return Like.findAll({
            where: {user_liked_id:args.user_liked_id, user_id: args.user_id}
        }).then(result => {
            let ret = {};

            result.forEach((data)=>{
                if(data.type == 'heart'){
                    ret['heart'] = 1;
                }
            });
            
            return ret;
        });
    },

    getUnreadConversations: async function(args,res){
        let limit = 5;
        let offset = 0 ;

        if(args.page > 1){
            offset = limit * args.page;
            offset = offset-5;
        }

        let query = `
        SELECT l.*
        FROM likes l 
        LEFT JOIN chats c ON c.participantId =  l.user_liked_id and c.participant2Id = l.user_id OR c.participantId = l.user_id and c.participant2Id = l.user_liked_id
        WHERE l.user_liked_id=${args.id} and l.type = 'heart'and c.id is null
        LIMIT ${offset},${limit}
        `;

        return Conn.query(query,{ model: Like} ).then(result=>{
            let ret = [];
            result.forEach((data)=>{
                ret[data.user_id] = User.findById(data.user_id).then(result=>{return result});
            });
            
            return ret; 
        });     



        
    }

    
}

export default fetch;