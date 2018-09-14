import {User, Config, Conversation, Message} from '../../db/mysql';

import sequelize from 'sequelize';

const fetch = {
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
    
    conversations: async function (args){
        const users = {};
        return await Conversation.findAll({
            where: {
                $or: [
                    {participantId: args.id},
                    {participant2Id: args.id},
                ]
            },
            include: [
                { model: User, as: 'participant' },
                { model: User, as: 'participant2' }
            ]
        }).then(conversations=>{
            // conversations.forEach(conversation=>{
            //     console.log(conversation)
            //     users[0] = {'name': conversation.participant.name};
            // })
            // console.log(conversations.length)
            for(let i = 0; i < conversations.length; i++){
                users[i] = {'conversation_id': conversations[i].id,'conversation_with': conversations[i].participant2.name, 'current_user': conversations[i].participant.name,};
            }
            console.log(users)
            return users;
        })
    },

    mensagens: async function (args){
        return await Message.findAll({where: {conversationId: args.id}})
    },
    
    config: async function(args,res){
        return Config.findAll({
            where: {userId:args.id},
            limit: 1
        });
    },
}

export default fetch;