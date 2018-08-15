import {GraphQLSchema} from 'graphql';
import QueryType from './src/Queries/query.type';
import MutationType from './src/Mutations/mutation.type';

const Schema =  new GraphQLSchema({
    name:'Api para o app Beach Paquera',
    description:'Api para consumo de serviços relacionados app Beach Paquera',
    query: QueryType,
    mutation:MutationType
});

export default Schema;