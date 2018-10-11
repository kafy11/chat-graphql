import { Message } from '../../db/mysql';

import Conn from '../../db/mysql';

const fetch = {
    conversations: async function (args){
        const nameWhere = (args.name) ? `AND LOWER(u.name) LIKE LOWER('%${args.name}%')` : ''; 
        const offsetWhere = (args.offsetMessage) ? `AND m.id < ${args.offsetMessage}` : '';

        return await Conn.query(`SELECT m.*
            FROM (
                SELECT CASE WHEN senderId = ${args.userId} THEN receiverId ELSE senderId END AS userId,
                                MAX(id) AS id
                FROM messages 
                WHERE ${args.userId} IN (senderId,receiverId)
                GROUP BY CASE WHEN senderId = ${args.userId} THEN receiverId ELSE senderId END
            ) l
            JOIN messages m
            ON m.id = l.id 
            JOIN users u 
            ON u.id = l.userId 
            WHERE 1 = 1 
            ${nameWhere} 
            ${offsetWhere} 
            ORDER BY m.id DESC 
            LIMIT 10`, { model: Message });
    },

    messages: async function ({ ids, offsetMessage }){
        let where = { 
            authorId: { 
                $in: ids
            },
            receiverId: { 
                $in: ids
            }
        };

        if(offsetMessage) {
            where.id = { $lt: offsetMessage };
        }

        return await Message.findAll({
            order: [['id', 'DESC']],
            limit: 10,
            where 
        });
    },
}

export default fetch;