'use strict';

import Hapi from 'hapi';
import Schema from './schema';
import {graphqlHapi, graphiqlHapi} from 'apollo-server-hapi';

const server = Hapi.server({
    host:'localhost',
    port:3000
});

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
                formatError: (error) => ({message: error.message, location:error.location, stack:error.stack}),
                debug: true
            }
        }
   });

}


async function registerRoutes(server){
    server.route({
        method: 'GET',
        path: '/',
        handler: ()=> 'Running Server'
    });
    await registerGraphql();
}

async function start(server){
    try {
        await registerRoutes(server);
        await server.start();
        console.log(`Servidor rodando em ${server.info.uri}`);
    }catch(error){
        console.error(error.message);
        process.exit;
    }
}

start(server);