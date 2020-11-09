import { User } from '../../db/sqlite';

const UserResolver = {
    edit: async function (args){
        let { id } = args;
        delete args.id;

        let updates = {};
        for(let f in args){
            if(args[f] != undefined){
                updates[f] = args[f];
            }
        }
        
        return User.update(updates,{ 
            where: { id: id } 
        }).then(result =>{
            return User.findById(id);
        });   
    },

    addUser: async function({ name, email }){
        return User.create({
            name, 
            email
        });
    },
}
                
export default UserResolver;