import { Schema, model, SchemaTypes, Types } from 'mongoose';
import { DateTime } from 'luxon';

export interface IBlogPost {
  title: string;
  text: string;
  datePublished: Date | null;
  dateEdited: Date | null;
  author: Types.ObjectId;
  previewUrl: string;
}

const blogPostSchema = new Schema<IBlogPost>({
  title: String,
  text: String,
  datePublished: SchemaTypes.Mixed,
  dateEdited: SchemaTypes.Mixed,
  author: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
  },
  previewUrl: String,
});

export default model('blogpost', blogPostSchema);
