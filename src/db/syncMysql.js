import Conn, {User} from './mysql';

Conn.sync({force: true}).then(()=>{
    console.log('DB connection sucessful.');
}, function(err){
    // catch error here
    console.log(err);
  
  }
);