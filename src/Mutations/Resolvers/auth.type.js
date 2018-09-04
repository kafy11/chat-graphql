import {User, Config} from '../../db/mysql';
import {WrongPasswordError} from '../errorHandler';

const fetch = {
    login: async function (args){
        const result = await User.findOne({where:{email:args.email}});
        
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
        //new_user.password = await Bcrypt.hash(new_user.password, 12);
        return User.create(new_user).then(user =>{
            Config.create().then(config => {
                user.setConfig(config);
            });
            return user;
        })
    }
}

export default fetch;