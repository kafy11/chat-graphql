import { GraphQLSchema } from 'graphql';
import QueryType from './src/Queries/query.type';
import MutationType from './src/Mutations/mutation.type';

const Schema =  new GraphQLSchema({
    name:'API do projeto',
    query: QueryType,
    mutation: MutationType
});

export default Schema;