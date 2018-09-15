import { Message } from '../../db/mysql';

const result = {
    deleteMessage: async function(args){
        return Message.findById(args.id).then(message=>{
            return message.destroy({force: true});
        })
    },

    addMessage: async function (args){
        return Message.create(args).then(message =>{
            return message;
        })
    }
}

export default result;
