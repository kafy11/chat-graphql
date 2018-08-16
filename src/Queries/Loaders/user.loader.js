import {User} from '../../db/mysql';

const fetch = {
    fetchAll: async function (args){
        const filter = {};
        
        return User.findAll({where:args});
    }
}

export default fetch;