import {User, Config} from '../../db/mysql';

const fetch = {
    edit: async function (args){
        return User.update(
            {
                name: args.name,
                age: args.age,
                bio: args.bio,
                gender: args.gender,
            },
            {where: {id: args.id}},
            {fields: args.name},
          ).then(user=>{
            console.log(user)
          })
    },

    config: async function (args){
        Config.update(
            {
                interest: args.interest,
                age_from: args.age_from,
                age_to: args.age_to,
            },
            {where: {userID: args.id}}
        ).then(user=>{
            console.log(user)
            return user;
        })
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