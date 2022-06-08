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
}

export interface IPost extends IPostAPI {
  url: string;
  datePublishedFormatted: string;
}

// Comment

export interface ICommentAPI {
  _id: string;
  author: string;
  text: string;
  date: string;
  post: string;
}

export interface IComment extends ICommentAPI {
  dateFormatted: string;
}

/* API Responses */

interface Response {
  success: boolean;
}

export interface IPostResponse extends Response {
  blogPost: IPostAPI;
}

export interface IPostsResponse extends Response {
  blogPosts: IPostAPI[];
}

export interface IPostsCountResponse extends Response {
  blogPostsCount: number;
}

export interface ICommentsResponse extends Response {
  comments: ICommentAPI[];
}
