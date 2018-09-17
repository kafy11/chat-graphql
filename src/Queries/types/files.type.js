import {
    GraphQLObjectType,
    GraphQLBoolean,
} from 'graphql';

const graphObj = new GraphQLObjectType({
    name:"FileUpload",
    description:"Uploads an image",
    fields: {
        image: {
            type: GraphQLBoolean,
            description:'Image file.'
        },
    }
});

export default graphObj;