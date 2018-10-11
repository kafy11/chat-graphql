import { File } from '../../db/mysql';

const fetch = {
    file: async function (args){
       return File.findAll({where: {id: args.id}})
    },
    files: async function (args){
        return File.findAll({where: {userId: args.userId, type:args.type}})
     },
}

export default fetch;