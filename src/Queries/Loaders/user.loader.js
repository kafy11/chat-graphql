import {User} from '../../db/mysql';

const fetch = {
    fetchAll: async function (args){
        console.log(args)
        const filter = {};
        
        return User.findAll({
                where:args
            }
        );
    }
}

const login = {
    
}

export default fetch;