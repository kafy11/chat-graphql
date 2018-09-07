import {Like, Config} from '../../db/mysql';
import {CantCreate} from '../errorHandler';

const fetch = {
    interaction: async function (args){
        try{
            return Like.create(args);
        }catch(e){
            throw new CantCreate();
        }
    }
}

export default fetch;