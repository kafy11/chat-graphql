// import {io} from '../../server';

// let messsages = [];
// io.on('connection', function(socket){
//     console.log(socket.id)
//     socket.emit('previousMessages', messsages);

//     socket.on('sendMessage', function(data){
//         messsages.push(data);
//         socket.broadcast.emit('receivedMessage', data);
//     })
// })