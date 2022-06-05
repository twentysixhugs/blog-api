/* Models */

export interface IUser {
  username: string;
}

export interface IPost {
  id: string;
  title: string;
  text: string;
  datePublished: Date | null;
  author: string;
  previewUrl: string;
  url: string;
  datePublishedFormatted: string | null;
}

export interface IComment {
  author: string;
  text: string;
  date: Date;
  post: string;
  dateFormatted: string;
}
