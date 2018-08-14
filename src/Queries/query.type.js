import CompanyType from './types/company.type';
import CompanyLoader from './Loaders/company.loader';

import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLList,
    GraphQLFloat
} from 'graphql';

const Query = new GraphQLObjectType({
    name:'Query',
    description:'Query para interação com a api do sistema de aniversário',
    fields: () => ({
        companies: {
            description:'Busca de emprsas',
            args: {
                id: {descripton:'ID unico da loja',type: GraphQLString},
                name: {descripton:'nome da loja',type: GraphQLString},
                cnpj: {descripton:'CNPJ da loja',type: GraphQLString},
                email: {descripton:'email da loja',type: GraphQLString}
            },
            type: new GraphQLList(CompanyType),
            resolve: (root,args) => CompanyLoader.fetchAll(args)
        }
    })
});

export default Query;