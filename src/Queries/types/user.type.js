import {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLList,
} from 'graphql';

const GeoLocation = new GraphQLObjectType({
    name:"user_geolocation",
    description:"Geolocalizacao do usuário",
    fields: {
        type: {
            type: GraphQLString,
            description:"Tipo da Geolizacao, deve ser sempre (Point)"
        },
        coordinates: {
            type: GraphQLList(GraphQLFloat),
            description: "Latitude e Longitude"
        }
    }
});


const graphObj = new GraphQLObjectType({
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
            description:'Email padrao do usuario'
        },
        password: {
            type: new GraphQLNonNull(GraphQLString),
            description: 'Senha do usuario'
        },
        location: {
            type:GeoLocation,
            description:"Latitude e longitude do usuário"
        },
        photo: {
            type: GraphQLString,
            description: 'Foto do usuario'
        },
        gender: {
            type: GraphQLString,
            description: 'Sexo do usuário'
        },
        bio: {
            type: GraphQLString,
            description: 'Descrição do perfil'
        },
        distance: {
            type: GraphQLFloat,
            description: 'distância com relação ao usuário logado'
        },
        visible: {
            type: GraphQLInt,
            description: 'Definir se o perfil do usuário está publico'
        },
        date_birthday: {
            type: GraphQLString,
            description:'Data de nascimento do usuário'
        },
        age: {
            type: GraphQLInt,
            description:'Idade do usuário'
        }
    }
});

export default graphObj;