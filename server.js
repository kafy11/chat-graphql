'use strict';

import Hapi from 'hapi';
import Schema from './schema';
import {graphqlHapi, graphiqlHapi} from 'apollo-server-hapi';
import { formatError } from "apollo-errors";
import HapiAuth from 'hapi-auth-basic';
import users from './src/db/auth';
import Bcrypt from 'bcrypt';
import { isObject } from 'util';

const server = Hapi.server({
    host:'localhost',
    port:3000
});

const io = require('socket.io')(server.listener);

async function registerGraphql(){
    await server.register({
        plugin: graphqlHapi,
        options: {
            path: '/graph',
            graphqlOptions: {
                schema:Schema,
                debug: true
            }
        }
    });

    await server.register({
        plugin: graphiqlHapi,
        options: {
            path:'/debug',
            graphiqlOptions: {
                endpointURL: '/graph',
                formatError: (error) => ({key:error.key,message: error.message, location:error.location, stack:error.stack}),
                debug: true
            }
        }
    });
}

// async function registerSocket(server){
//     await server.register({
//         plugin: hapiSocketIo,
//     });
// }

async function registerRoutes(server){
    server.route({
        method: 'GET',
        path: '/',
        options: {
            auth: 'simple'
        },
        handler: ()=> 'Running Server'
    });
    
    server.route({
        method: "GET",
        path: "/chat",
        
        handler: function(request, h){
            return h.file('./src/chat/chat.html');
        }
    })
    await registerGraphql();
}

async function auth(server){
    await server.register(HapiAuth);
    server.auth.strategy('simple', 'basic', { validate });
}

const validate = async (request, username, password) => {
    const user = users[username];
    if (!user) {
        return { credentials: null, isValid: false };
    }
    
    const isValid = await Bcrypt.compare(password, user.password);
    const credentials = { id: user.id, name: user.name };
    
    return { isValid, credentials };
};

async function start(server){
    try {
        await server.register(require('inert'));
        await auth(server);
        // await registerSocket(server);        
        await registerRoutes(server);
        await server.start();
        /*Bcrypt.hash('app@paquera@beach', 2, function(err, hash) {
            console.log('hash',hash);
        });*/
        console.log(`Servidor rodando em ${server.info.uri}`);
    }catch(error){
        console.error(error.message);
        process.exit;
    }
}

start(server);

let messsages = [];
io.on('connection', function(socket){
    console.log(socket.id)
    socket.emit('previousMessages', messsages);

    socket.on('sendMessage', function(data){
        messsages.push(data);
        socket.broadcast.emit('receivedMessage', data);
    })
})