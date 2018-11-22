'use strict';

import Hapi from 'hapi';
import Schema from './schema';
import {graphqlHapi, graphiqlHapi} from 'apollo-server-hapi';
import { formatError } from "apollo-errors";
import HapiAuth from 'hapi-auth-basic';
import users from './src/db/auth';
import { isObject } from 'util';
import fs from 'fs';
import Boom from 'boom';    
import path from 'path';
import upload from './src/Mutations/Resolvers/upload.resolver';
import ioHandlers from './src/Socket/handlers';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';


const server = Hapi.server({
    host:'localhost',
    port:3000
});

var io = require('socket.io')(server.listener);
io.on('connection', ioHandlers);

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
        options: {
            auth: 'simple'
        },
        handler: ()=> 'Running Server'
    });

    server.route({
        method: "GET",
        path: "/uploads/{file*}",
        
        handler: {
            directory: {
                path: './uploads',
                redirectToSlash: true,
                index: true,
            }
        }
    });
    
    server.route({
        method: "GET",
        path: "/chat",
        
        handler: function(request, h){
            return h.file('./src/Socket/client-teste/chat.html');
        }
    })

    
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
            const fileOptions = { dest: `${UPLOAD_PATH}/`};

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

                const insert = await upload.store(filesDetails, options)
                return filesDetails.path;

            } catch (err){
                return Boom.badRequest(err.message, err);
            }
        }
    });

    server.route({
        method: 'DELETE',
        path: '/upload',
        handler: async function (request, reply) {
            const UPLOAD_PATH = 'uploads';

            try{
                const data = request.payload;
                if(!data['user_id'] || !data['image_name']){
                    return 'Faltam parâmetros';
                }
                
                const del = await upload.delete(data);    
                
                //fs.unlinkSync(UPLOAD_PATH+'/'+data['image_name']);    
                return true;

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

    let len = file.hapi.filename.length;
    let extension = file.hapi.filename.substring(len-4,len);
    const filename = Date.now()+extension;

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

            //console.log('details',fileDetails);
            
            resolve(fileDetails);
        })
    })
}

const _filesHandler = function (files, options) {
    if (!files || !Array.isArray(files)) throw new Error('no files');
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
    
    const isValid = (password == user.password);
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