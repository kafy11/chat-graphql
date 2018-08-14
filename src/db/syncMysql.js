import Conn, {Company, CompanyConfig,Plan} from './mysql';
import Faker from 'faker';
import CNPJ from '@fnando/cnpj/dist/node';

Conn.sync({force: true}).then(()=>{

  Plan.create({
    name:'free',
    price:0
  }).then(p_free=>{

    Plan.create({
      name:'Basic',
      price:89.90
    });

    let company_name = Faker.company.companyName();
    let fn = company_name.split(' ');
    let fantasy_name = fn[0];
    if(fn[1]){
      fantasy_name += fantasy_name[1];
    }
    let domain = fantasy_name.replace(' ','_');
    Company.create({
      name:company_name,
      fantasy_name: fantasy_name,
      cnpj:CNPJ.generate(),
      email:Faker.internet.userName()+'@'+fn[0]+'.com',
      address:Faker.address.streetAddress(),
      planId:p_free.id,
      active:1      
    }).then(company=>{
      CompanyConfig.create({
        logo: Faker.random.image(),
        type:'limit'
      }).then(config => {
        Company.update(
            {companyConfigId:config.id},
            {where: {id:company.id}});
      });
    });


  });

});