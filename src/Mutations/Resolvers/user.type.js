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