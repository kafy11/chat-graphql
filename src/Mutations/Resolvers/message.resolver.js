import {User, Config, Conversation, Messege} from '../../db/mysql';


const result = {

    createMessage: async function(args){
        User.findById(args.userId).then(user=>{
            User.findById(args.userId2).then(user2=>{
                Conversation.create(args).then(conversation=>{
                    console.log(conversation)
                    Messege.create(args.content).then(messege=>{
                        conversation.addMessege(messege)
                    })
                })
            })
        })
    }
    
}

export default result;
