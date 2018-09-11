import {User, Config, Conversation, Messege} from '../../db/mysql';

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
}

export default fetch;