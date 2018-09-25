import {User, Config, Conversation, Message} from '../../db/mysql';
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
            
        passwordResetToken: async function (args){
                const tokgen = new TokenGenerator();
                return await User.update(
                        {reset_pass: tokgen.generate()},
                        {where: {email: args.email}}
                    ).then(user=>{
                        console.log(user)
                        return user
                    })
        },
                
        passwordReset: async function (args){

            return await User.update(
                {
                    password: args.password,
                    reset_pass: null,
                },
                {
                    where: {email: args.email},
                    $and:[{reset_pass: args.token}]
                }).then(user=>{
                    return user
                })
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