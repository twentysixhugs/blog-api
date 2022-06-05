/* Models */

// User

export interface IUser {
  username: string;
}

// Post

export interface IPostAPI {
  _id: string;
  title: string;
  text: string;
  datePublished: string;
  author: {
    _id: string;
    username: string;
  };
  previewUrl: string;
}

export interface IPost extends IPostAPI {
  url: string;
  datePublishedFormatted: string;
}

// Comment

export interface ICommentAPI {
  author: string;
  text: string;
  date: string;
  post: string;
}

export interface IComment extends ICommentAPI {
  dateFormatted: string;
}
