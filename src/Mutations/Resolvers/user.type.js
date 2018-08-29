import {User, Gender} from '../../db/mysql';

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
        const gender = Gender.find({where:args.id});
        return user.setGender(gender);
    }
}

export default fetch;