import { Model, Schema, model } from 'mongoose';
import DbSchema from '../dbSchema';
import { Lyric } from '../../models';

type InstanceMethods = {};
type StaticMethods = {
  like: (id: string) => void;
};

type LyricModelType = Model<Lyric, {}, InstanceMethods> & StaticMethods;

const LyricSchema = new Schema<Lyric, LyricModelType>({
  song: {
    type: Schema.Types.ObjectId,
    ref: 'song'
  },
  likes: { type: Number, default: 0 },
  content: { type: String }
});

LyricSchema.statics.like = async function (id) {
  const Lyric = model(DbSchema.Lyric);

  let lyric = await Lyric.findById(id);
  ++lyric.likes;

  return lyric.save();
}

const LyricModel = model<Lyric, LyricModelType>(DbSchema.Lyric, LyricSchema);

export default LyricModel;
