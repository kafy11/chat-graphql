import {USER_CONNECTED, MESSAGE_SEND, PRIVATE_MESSAGE} from './events';
import user from '../Queries/Loaders/user.loader';
import chatLoader from '../Queries/Loaders/chat.loader';
import userResolver from '../Mutations/Resolvers/user.resolver';
import chatResolver from '../Mutations/Resolvers/chat.resolver';
import Query from '../Queries/query.type';
import { get } from 'https';

let connectedUsers = {}

module.exports = function(socket){
    socket.on(USER_CONNECTED, async (id)=>{
        const user = await getUser(id, socket.id)
        socket.user = user
        console.log('connected: '+socket.id)
        // connectedUsers = addUser(connectedUsers, user)
    })

    socket.on(PRIVATE_MESSAGE, async (data)=>{
        console.log(data)
        const newChat = await createChat(data);
        const newMessage = await createMessage(data, newChat);
        const receiver = await user.fetch({id: data.receiver});
        console.log('send to: '+receiver.dataValues.socketId)
		socket.broadcast.to(receiver.dataValues.socketId).emit(PRIVATE_MESSAGE, {newChat, newMessage})
		socket.emit(PRIVATE_MESSAGE, {newChat, newMessage})
	})

    // socket.on('disconnect', ()=>{
    //     if('user' in socket){
    //         connectedUsers = removeUser(connectedUsers, socket.user.name)
    //     }
    // })

    async function getUser(id, socketId){
        const args = {id:id}
        const query = await user.fetch(args);
        
        if(query == null){
            return 0;
        }
        const update = await userResolver.socketId(id, socketId);
        query.dataValues.socketId = socketId;
        return query.dataValues;
    }

    async function createChat(data){
        let chat = await chatLoader.chat(data);

        if(chat == null){
            chat = await chatResolver.newChat(data)
        }
        return chat;
    }

    async function createMessage(data, chat){
        const args = {
            sender: data.sender,
            receiver: data.receiver,
            content: data.message,
            chat: chat.id
        }

        console.log(args)
        const message = await chatResolver.newMessage(args);

        return message;
    }

    // function addUser(userList, user){
    //     let newList = Object.assign({}, userList)
    //     newList[user.name] = user
    //     return newList
    // }

    // function removeUser(userList, username){
    //     let newList = Object.assign({}, userList)
    //     delete newList[username]
    //     return newList
    // }

    
}