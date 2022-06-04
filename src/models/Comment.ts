import { Schema, model, SchemaTypes, Types } from 'mongoose';
import { DateTime } from 'luxon';

export interface IComment {
  author: Types.ObjectId;
  text: string;
  date: Date;
  post: Types.ObjectId;
  dateFormatted: string;
}

const commentSchema = new Schema<IComment>({
  author: {
    type: SchemaTypes.ObjectId,
    ref: 'User',
  },
  post: {
    type: SchemaTypes.ObjectId,
    ref: 'Post',
  },
  text: String,
  date: Date,
});

commentSchema.virtual('dateFormatted').get(function () {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
});

export default model('comment', commentSchema);
