import { Schema, model, SchemaTypes, Types } from 'mongoose';
import { DateTime } from 'luxon';

export interface IBlogPost {
  title: string;
  text: string;
  datePublished: Date | null;
  dateEdited: Date | null;
  author: Types.ObjectId;
  previewUrl: string;
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
  previewUrl: String,
});

blogPostSchema.virtual('url').get(function () {
  return `/posts/${this._id}`;
});

blogPostSchema
  .virtual('formattedDate')
  .get(function (date: 'datePublished' | 'dateEdited') {
    // return null or formatted date
    return (
      this[date] &&
      DateTime.fromJSDate(this[date]!).toLocaleString(DateTime.DATE_MED)
    );
  });

export default model('blogpost', blogPostSchema);
