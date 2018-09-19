import { File } from '../../db/mysql';

const fetch = {
    file: async function (args){
       return File.findAll({where: {id: args.id}})
    },
}

export default fetch;