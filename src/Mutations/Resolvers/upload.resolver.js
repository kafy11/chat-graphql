import {User, File} from '../../db/mysql';

const result = {
    store: async function(args,options){
        if(options.type !== 'profile'){
            return File.create({name:args.filename,path: args.path, userId: options.user,type:'photo'});
        }
        else{
            return User.update(
                {photo: args.path},
                {where: {id:options.user}}
            );
        }
    }
}

export default result;