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
    },
    delete: async function(args){
        if(args['type'] !== 'profile'){
            return File.destroy({
                where: {
                    name:args['image_name'],
                    userId:args['user_id']
                }
            });
        }
        else{
            return User.update(
                {photo: ''},
                {where: {id:args['user_id']}}
            );
        }
    }
}

export default result;