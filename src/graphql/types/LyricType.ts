import { GraphQLID, GraphQLInt, GraphQLObjectType, GraphQLString } from 'graphql';
import LyricModel from '../../mongoose/models/LyricModel';
import SongType from './SongType';

const LyricType: any = new GraphQLObjectType({
  name:  'LyricType',
  fields: () => ({
    id: { type: GraphQLID },
    likes: { type: GraphQLInt },
    content: { type: GraphQLString },
    song: {
      type: SongType,
      resolve: async (parentValue) => {
        const lyric = await LyricModel.findById(parentValue).populate('song');
        return lyric!.song;
      }
    }
  })
});

export default LyricType;
