import { Schema, model, SchemaTypes, Types } from 'mongoose';

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
  text: {
    type: String,
  },
  date: Date,
});

export default model('comment', commentSchema);
