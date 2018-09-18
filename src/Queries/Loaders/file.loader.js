import { File } from '../../db/mysql';

import Conn from '../../db/mysql';

const fetch = {
    file: async function (args){
       return await File.findById(args.id)
    },
}

export default fetch;