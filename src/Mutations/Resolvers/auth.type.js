import {User, Config} from '../../db/mysql';
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
    },

    register: async function (args){
        const new_user = args;
        User.create(new_user).then(user =>{
            Config.create().then(config => {
                user.setConfig(config);
            })
        })
    }
}

export default fetch;