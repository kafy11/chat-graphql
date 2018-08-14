import {Company} from '../../db/mysql';

const fetch = {
    fetchAll: async function (args){

        const filter = {};
        
        return Company.findAll();
    }
}

export default fetch;