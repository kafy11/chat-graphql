import { User } from '../../db/sqlite';

const UserLoader = {
    fetch: async function (args, res){
        let where = {};
        for(let f in args){
            if(args[f] != undefined){
                where[f] = args[f];
            }
        }
        
        return await User.find({ where });
    },

    find: async function(args){
        return await User.findById(args.id);
    },

    fetchAll: async function (args, res){
        let where = {};
        for(let f in args){
            if(args[f] != undefined){
                where[f] = args[f];
            }
        }
        
        return await User.findAll({ where });
    }, 
}

export default UserLoader;