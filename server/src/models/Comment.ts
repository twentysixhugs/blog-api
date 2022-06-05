import { Schema, model, SchemaTypes, Types } from 'mongoose';
import { DateTime } from 'luxon';

export interface IComment {
  author: string;
  text: string;
  date: Date;
  post: Types.ObjectId;
}

const commentSchema = new Schema<IComment>({
  author: String,
  post: {
    type: SchemaTypes.ObjectId,
    ref: 'Post',
  },
  text: String,
});

export default model('comment', commentSchema);
