import { Model, Schema, model } from 'mongoose';
import DbSchema from '../dbSchema';
import { Lyric, Song } from '../../models';

type InstanceMethods = {};
type StaticMethods = {
  addLyric: (id: string, content: string) => Song;
  findLyrics: (id: string) => Lyric;
};

type SongModelType = Model<Song, {}, InstanceMethods> & StaticMethods;

const SongSchema = new Schema<Song, SongModelType>({
  title: { type: String },
  user: {
    type: Schema.Types.ObjectId,
    ref: DbSchema.User
  },
  lyrics: [{
    type: Schema.Types.ObjectId,
    ref: DbSchema.Lyric
  }]
});

SongSchema.statics.addLyric = async function (id, content) {
  const Lyric = model(DbSchema.Lyric);

  const song = await this.findById(id);
  const lyric = new Lyric({ content, song });
  song!.lyrics.push(lyric);

  const result = await Promise.all([lyric.save(), song!.save()]);
  const [, songSaved] = result;
  return songSaved;
}

SongSchema.statics.findLyrics = async function (id) {
  const song = await this.findById(id).populate('lyrics');
  return song!.lyrics;
}


const SongModel = model<Song, SongModelType>(DbSchema.Song, SongSchema);

export default SongModel;
