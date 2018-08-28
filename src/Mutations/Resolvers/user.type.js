import {User} from '../../db/mysql';

const fetch = {
    edit: async function (args){
        const filter = {};
        User.update(
            {name: args.name},
            {where: {id: args.id}},
            {fields: args.name},
          ).then(() => {
            return 'sucesso';
          })
    }
}

export default fetch;