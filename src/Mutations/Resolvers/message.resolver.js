import io from '../../../server';
import {User, Config, Conversation, Message} from '../../db/mysql';

import sequelize from 'sequelize';


const result = {
    startSocket: async function(args){
        io.on('connection', function(socket){
            console.log('connect: '+socket.id)
            socket.on('sendMessage', function(data){
                console.log(data)
                Conversation.find({
                    where: {
                        $and: [
                            {participantId: {[sequelize.Op.or]: [data.author, data.receiver]}},
                            {participant2Id: {[sequelize.Op.or]: [data.receiver, data.author]}},
                        ],
                    }
                }).then(conversation=>{
                    // console.log(conversation)
                    if(conversation == null){
                        Conversation.create({
                            participantId: data.author,
                            participant2Id: data.receiver,
                        }).then(conversation=>{
                            Message.create({
                                conversationId: conversation.id,
                                authorId: data.author,
                                receiverId: data.receiver,
                                content: data.message
                            }).then(message=>{
                                socket.broadcast.emit('receivedMessage', data);
                            })
                        })
                    }else{
                        Message.create({
                            conversationId: conversation.id,
                            authorId: data.author,
                            receiverId: data.receiver,
                            content: data.message
                        }).then(message=>{
                            socket.broadcast.emit('receivedMessage', data);
                        })
                    }
                })
            })
        })
    }
}

export default result;
