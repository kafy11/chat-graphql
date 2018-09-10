import {User, Config} from '../../db/mysql';

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
        Config.update(
            {
                interest: args.interest,
                age_from: args.age_from,
                age_to: args.age_to,
            },
            {where: {userID: args.id}}
        );
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