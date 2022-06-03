import { Schema, model, SchemaTypes, Types } from 'mongoose';
import { DateTime } from 'luxon';

export interface IBlogPost {
  title: string;
  text: string;
  datePublished: Date | null;
  author: Types.ObjectId;
  comments: Types.ObjectId;
  url: string;
  datePublishedFormatted: string;
}

const blogPostSchema = new Schema<IBlogPost>({
  title: String,
  text: String,
  datePublished: SchemaTypes.Mixed,
  author: {
    type: SchemaTypes.ObjectId,
    ref: 'user',
  },
  comments: {
    type: SchemaTypes.ObjectId,
    ref: 'comment',
  },
});

blogPostSchema.virtual('url').get(function () {
  return `/posts/${this._id}`;
});

blogPostSchema.virtual('datePublishedFormatted').get(function () {
  // return null or formatted date
  return (
    this.datePublished &&
    DateTime.fromJSDate(this.datePublished).toLocaleString(
      DateTime.DATE_MED,
    )
  );
});

export default model('Blogpost', blogPostSchema);
