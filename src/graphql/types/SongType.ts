import { GraphQLList, GraphQLObjectType, GraphQLString, GraphQLID } from 'graphql';
import LyricType from './LyricType';
import SongModel from '../../mongoose/models/SongModel';

const SongType = new GraphQLObjectType({
  name: 'SongType',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    lyrics: {
      type: new GraphQLList(LyricType),
      resolve(parentValue) {
        return SongModel.findLyrics(parentValue.id);
      }
    }
  })
});

export default SongType;
