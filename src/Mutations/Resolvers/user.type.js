import {User, Config} from '../../db/mysql';

const fetch = {
    edit: async function (args){
        User.update(
            {
                name: args.name,
                age: args.age,
                bio: args.bio,
            },
            {where: {id: args.id}},
            {fields: args.name},
          ).then(() => {
            return 'sucesso';
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
    }
}

export default fetch;