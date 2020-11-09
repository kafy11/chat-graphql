import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt
} from 'graphql';

const UserType = new GraphQLObjectType({
    name:"usuarios",
    description:"Objeto de usuarios cadastrar no sistema",
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLInt),
            description:'id do usuario'
        },
        name: {
            type: new GraphQLNonNull(GraphQLString),
            description:'Nome do usuario'
        },
        email: {
            type: new GraphQLNonNull(GraphQLString),
            description:'Email do usuario'
        }
    }
});

export default UserType;