import Conn, {User, Config} from './mysql';

Conn.sync({force: true}).then(()=>{
    let user1 = {
        name:"Vinicius Rangel",
        "email":"vinicius@agencia4p.com",
        "password":"e10adc3949ba59abbe56e057f20f883e",
        "gender":"M",
        "date_birthday":"1993-05-14",
        location: {type:'Point',coordinates:['-23.539675','-46.578920']}
     };
    //4pixels
    User.create(user1).then(user =>{
        Config.create({'interest': 'M', 'age_from': 18, 'age_to': 25}).then(config => {
            user.setConfig(config)
        })
    })

    let user2 = {
        name:"Thales Gazaneo",
        "email":"thales@agencia4p.com",
        "password":"e10adc3949ba59abbe56e057f20f883e",
        "gender":"M",
        "date_birthday":"1969-10-20",
        location: {type:'Point',coordinates:['-23.565960','-46.505224']} };
    //telha norte aricanduva
    User.create(user2).then(user =>{
        Config.create({'interest': 'M', 'age_from': 18, 'age_to': 26}).then(config => {
            user.setConfig(config)
        })
    })

    let user3 = {
        name:"Wiatan Champz",
        "email":"wiatan@agencia4p.com",
        "password":"e10adc3949ba59abbe56e057f20f883e",
        "gender":"M",
        "date_birthday":"1989-10-20",
        location: {type:'Point',coordinates:['-23.676247','-46.676739']} };
    //shopping interlagos
    User.create(user3).then(user =>{
        Config.create({'interest': 'F', 'age_from': 18, 'age_to': 27}).then(config => {
            user.setConfig(config)
        })
    })

    let user4 = {
        name:"Oscar Maroni",
        "email":"maroni@bahamas.com.br",
        "password":"e10adc3949ba59abbe56e057f20f883e",
        "gender":"M",
        "date_birthday":"1999-10-20",
        location: {type:'Point',coordinates:['-23.604857','-46.664786']} };
    //bahamas
    User.create(user4).then(user =>{
        Config.create({'interest': 'M', 'age_from': 18, 'age_to': 28}).then(config => {
            user.setConfig(config)
        })
    })

    console.log('DB connection sucessful.');
}, function(err){
    console.log('erro ao sincronizar',err);
  }
);