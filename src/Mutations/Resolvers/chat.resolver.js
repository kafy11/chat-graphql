import {User, Config, Chat, Message} from '../../db/mysql';

import sequelize from 'sequelize';


const result = {
    newChat: async function(args){
        return Chat.create({
            participantId: args.sender,
            participant2Id: args.receiver,
        })
    },

    newMessage: async function(args){
        return Message.create({
            chatId: args.chat,
            authorId: args.author,
            receiverId: args.receiver,
            content: args.content
        })
    },

    deleteMessage: async function(args){
        return Message.findById(args.id).then(message=>{
            return message.destroy({force: true});
        })
    }

    // startSocket: async function(args){
    //     io.on('connection', function(socket){
    //         console.log('connect: '+socket.id)
    //         socket.on('sendMessage', function(data){
    //             console.log(data)
    //             Conversation.find({
    //                 where: {
    //                     $and: [
    //                         {participantId: {[sequelize.Op.or]: [data.author, data.receiver]}},
    //                         {participant2Id: {[sequelize.Op.or]: [data.receiver, data.author]}},
    //                     ],
    //                 }
    //             }).then(conversation=>{
    //                 // console.log(conversation)
    //                 if(conversation == null){
    //                     Conversation.create({
    //                         participantId: data.author,
    //                         participant2Id: data.receiver,
    //                     }).then(conversation=>{
    //                         Message.create({
    //                             conversationId: conversation.id,
    //                             authorId: data.author,
    //                             receiverId: data.receiver,
    //                             content: data.message
    //                         }).then(message=>{
    //                             socket.broadcast.emit('receivedMessage', data);
    //                         })
    //                     })
    //                 }else{
    //                     Message.create({
    //                         conversationId: conversation.id,
    //                         authorId: data.author,
    //                         receiverId: data.receiver,
    //                         content: data.message
    //                     }).then(message=>{
    //                         socket.broadcast.emit('receivedMessage', data);
    //                     })
    //                 }
    //             })
    //         })
    //     })
    // },
}

export default result;
