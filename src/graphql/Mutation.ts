import { GraphQLID, GraphQLObjectType, GraphQLString, GraphQLNonNull } from 'graphql';
import SongType from './types/SongType';
import LyricType from './types/LyricType';
import SongModel from '../mongoose/models/SongModel';
import LyricModel from '../mongoose/models/LyricModel';

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    addSong: {
      type: SongType,
      args: {
        title: { type: new GraphQLNonNull(GraphQLString) }
      },
      resolve(parentValue, { title }) {
        return new SongModel({ title }).save();
      }
    },
    addLyricToSong: {
      type: SongType,
      args: {
        content: { type: new GraphQLNonNull(GraphQLString) },
        songId: { type: new GraphQLNonNull(GraphQLID) }
      },
      resolve(parentValue, { content, songId }) {
        return SongModel.addLyric(songId, content);
      }
    },
    likeLyric: {
      type: LyricType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve(parentValue, { id }) {
        return LyricModel.like(id);
      }
    },
    deleteSong: {
      type: SongType,
      args: { id: { type: new GraphQLNonNull(GraphQLID) } },
      resolve: (parentValue, { id }) => {
        // return SongModel.deleteOne({ _id: id });
        //https://mongoosejs.com/docs/api/model.html
        return SongModel.findByIdAndDelete(id);
      }
    }
  }
});

export default Mutation;
