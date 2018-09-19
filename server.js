'use strict';

import Hapi from 'hapi';
import Schema from './schema';
import {graphqlHapi, graphiqlHapi} from 'apollo-server-hapi';
import { formatError } from "apollo-errors";
import HapiAuth from 'hapi-auth-basic';
import users from './src/db/auth';
import Bcrypt from 'bcrypt';
import { isObject } from 'util';
import fs from 'fs';
import Boom from 'boom';    
import path from 'path';
import upload from './src/Mutations/Resolvers/upload.resolver';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';

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
                subscriptionsEndpoint: `ws://localhost:3000/subscriptions`,
                formatError: (error) => ({key:error.key,message: error.message, location:error.location, stack:error.stack}),
                debug: true
            }
        }
    });

    new SubscriptionServer({
        execute,
        subscribe,
        schema: Schema
      }, {
        server: server.listener,
        path: '/subscriptions',
    });
}

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
    });
    
    server.route({
        method: 'POST',
        path: '/upload',
        config: {
            payload: {
                output: 'stream',
                allow: 'multipart/form-data'
            }
        },
        handler: async function (request, reply) {
            const UPLOAD_PATH = 'uploads';
            const fileOptions = { dest: `${UPLOAD_PATH}/` };

            // create folder for upload if not exist
            if (!fs.existsSync(UPLOAD_PATH)) fs.mkdirSync(UPLOAD_PATH);
            try{
                const data = request.payload;
                const files = data['image'];
                
                const filesDetails = await uploader(files, fileOptions);
                const options = {
                    user: data['id'],
                    type: data['type']
                }

                const insert = {
                    resolve: upload.store(filesDetails, options)
                }

                return insert;

            } catch (err){
                return Boom.badRequest(err.message, err);
            }
        }
    });
    
    await registerGraphql();
}

const _fileHandler = function (file, options) {
    if (!file) throw new Error('no file');
    
    const orignalname = file.hapi.filename;
    const filename = file.hapi.filename;
    const path = `${options.dest}${filename}`;
    const fileStream = fs.createWriteStream(path);
    
    return new Promise((resolve, reject) => {
        file.pipe(fileStream);
        
        file.on('end', function (err) {
            file.on('error', function (err) {
                reject(err);
            });
            
            const fileDetails = {
                fieldname: file.hapi.name,
                originalname: file.hapi.filename,
                filename,
                mimetype: file.hapi.headers['content-type'],
                destination: `${options.dest}`,
                path,
                size: fs.statSync(path).size,
            }
            
            resolve(fileDetails);
        })
    })
}

const _filesHandler = function (files, options) {
    if (!files || !Array.isArray(files)) throw new Error('no files');
    console.log(files)
    const promises = files.map(x => _fileHandler(x, options));
    return Promise.all(promises);
}

const uploader = function (file, options) {
    if (!file) throw new Error('no file(s)');
    return Array.isArray(file) ? _filesHandler(file, options) : _fileHandler(file, options);
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