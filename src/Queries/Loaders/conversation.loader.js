import {User, Config, Message} from '../../db/mysql';

import Conn from '../../db/mysql';

const fetch = {
    conversations: async function (args){
        const nameWhere = (args.name) ? `WHERE u.name = '${args.name}'` : ''; 

        return await Conn.query(`SELECT m.*
            FROM (
                SELECT CASE WHEN authorId = ${args.userId} THEN receiverId ELSE authorId END AS userId,
                                MAX(id) AS id
                FROM messages 
                WHERE ${args.userId} IN (authorId,receiverId)
                GROUP BY CASE WHEN authorId = ${args.userId} THEN receiverId ELSE authorId END
            ) l
            JOIN messages m
            ON m.id = l.id 
            JOIN users u 
            ON u.id = l.userId 
            ${nameWhere} 
            ORDER BY m.id DESC`, { model: Message });
    },

    messages: async function ({ ids }){
        return await Message.findAll({
            where: { 
                authorId: { 
                    $in: ids
                },
                receiverId: { 
                    $in: ids
                }
            }
        });
    },
}

export default fetch;