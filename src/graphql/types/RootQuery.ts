import { GraphQLID, GraphQLList, GraphQLNonNull, GraphQLObjectType } from 'graphql';
import SongType from './SongType';
import LyricType from './LyricType';
import SongModel from '../../mongoose/models/SongModel';
import LyricModel from '../../mongoose/models/LyricModel';

const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  fields: () => ({
    songs: {
      type: new GraphQLList(SongType),
      resolve() {
        return SongModel.find({});
      }
    },
    song: {
      type: SongType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return SongModel.findById(id);
      }
    },
    lyric: {
      type: LyricType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parnetValue, { id }) {
        return LyricModel.findById(id);
      }
    }
  })
});

export default RootQuery;
