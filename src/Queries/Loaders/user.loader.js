import {User, Config} from '../../db/mysql';

const fetch = {
    fetchAll: async function (args, res){
        const filter = {};
        
        return User.findAll({where:args});
    },

    feed: async function (args){
        User.findById(args.id, {
            include: [{
                model: Config,
            }]
        }).then(user=>{
            User.findAll({
                include:[
                    {
                        model: Config, 
                        where: {
                            interest: user.config.interest
                        }
                    }]
                }
            ).then(users => {
                console.log(users)
            })
        })
    }
}

export default fetch;