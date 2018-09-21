import { Message, Chat } from '../../db/mysql';

import sequelize from 'sequelize';

const fetch = {
    chat: async function (args){
        return Chat.find({
            where: {
                $and: [
                    {participantId: {[sequelize.Op.or]: [args.sender, args.receiver]}},
                    {participant2Id: {[sequelize.Op.or]: [args.receiver, args.sender]}},
                ],
            }
        })
    },
}

export default fetch;

