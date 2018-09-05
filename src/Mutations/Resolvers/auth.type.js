import {User, Config} from '../../db/mysql';
import {WrongPasswordError,EmailExist} from '../errorHandler';

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

        const result = await User.findOne({where:{email:args.email}});
        if(result){
            throw new EmailExist();
        }else{
            const new_user = args;

            return User.create(new_user).then(user =>{
                Config.create().then(config => {
                    user.setConfig(config);
                });
                return user;
            })
        }
    }
}

export default fetch;