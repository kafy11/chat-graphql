import {User} from '../../db/mysql';
import {WrongPasswordError} from '../errorHandler';

const fetch = {
    login: async function (args){
        const result = await User.findOne({where:args});
        if(result){
            if(args.password == result.password){
                return result;
            }
            else
            {
                throw new WrongPasswordError();
            }    
        }
    }
}

export default fetch;