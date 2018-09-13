import {User, Config, Conversation, Message} from '../../db/mysql';

import sequelize from 'sequelize';

const fetch = {
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
}

export default fetch;