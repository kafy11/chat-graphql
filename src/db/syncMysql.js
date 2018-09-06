import Conn, {User} from './mysql';

Conn.sync({force: true}).then(()=>{
    let user1 = {name:"Vinicius Rangel","email":"vinicius@agenciap4.com","password":"e10adc3949ba59abbe56e057f20f883e",location: {type:'Point',coordinates:['-23.539675','-46.578920']} };
    //4pixels
    User.create(user1);


    let user2 = {name:"Thales Gazaneo","email":"thales@agenciap4.com","password":"e10adc3949ba59abbe56e057f20f883e",location: {type:'Point',coordinates:['-23.565960','-46.505224']} };
    //telha norte aricanduva
    User.create(user2);

    let user3 = {name:"Wiatan Champz","email":"wiatan@agenciap4.com","password":"e10adc3949ba59abbe56e057f20f883e",location: {type:'Point',coordinates:['-23.676247','-46.676739']} };
    //shopping interlagos
    User.create(user3);

    let user4 = {name:"Oscar Maroni","email":"maroni@bahamas.com.br","password":"e10adc3949ba59abbe56e057f20f883e",location: {type:'Point',coordinates:['-23.604857','-46.664786']} };
    //bahamas
    User.create(user4);

    console.log('DB connection sucessful.');
}, function(err){
    console.log('erro ao sincronizar',err);
  }
);