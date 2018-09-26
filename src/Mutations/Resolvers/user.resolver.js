import { User, Config } from '../../db/mysql';
import { InvalidToken, EmailNotExist } from '../errorHandler';
// import {TokenGenerator} from 'uuid-token-generator';
const TokenGenerator = require('uuid-token-generator');

const fetch = {
    edit: async function (args){
        let filter = {};
        let id = args.id;
        args.id = undefined;
        for(let f in args){
            if(args[f] != undefined){
                filter[f] = args[f];
            }
        }
        
        return User.update(
            filter,
            {where: {id: id}}
            ).then(result=>{
                return User.findById(id);
            });
            
        },
        
        config: async function (args){
            let filter = {};
            let id = args.id;
            args.id = undefined;
            for(let f in args){
                if(args[f] != undefined){
                    filter[f] = args[f];
                }
            }
            return Config.update(
                filter,
                {where: {userId:id}}
                ).then(result=>{
                    return Config.find({where:{userId:id}});
                });
        },
            
        interest: async function (args){
                User.findById(args.id).then(user=>{
                    Config.find({where: {userID: user.id}}).then(config=>{
                        config.update({
                            interest: args.gender,
                        })
                    })
                });
        },    
            
        passwordResetToken: async function ({ email }){
            const result = await User.findOne({
                where: { email }
            });

            if(result) {
                const tokgen = new TokenGenerator();
                return await User.update(
                        {reset_pass: tokgen.generate()},
                        {where: { email }}
                    ).then(user=>{
                        console.log(user)
                        return user
                    });
            } else {
                throw new EmailNotExist();
            }
        },
                
        passwordReset: async function ({ email, token, password }){
            const where = {
                email,
                reset_pass: token
            };
            const result = await User.findOne({ where });

            if(result){
                return await User.update(
                {
                    password,
                    reset_pass: null,
                },{ where }).then(user=>{
                    return user
                });
            } else {
                throw new InvalidToken();
            }
        },

        socketId: async function (id, socketId) {
            return await User.update(
                {
                    socketId: socketId
                },
                {where: {id: id}}
            )
        }
}
                
                export default fetch;