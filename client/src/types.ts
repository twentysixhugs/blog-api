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

export interface APIResponse {
  success: boolean;
}

export interface IPostResponse extends APIResponse {
  blogPost: IPostAPI;
}

export interface IPostsResponse extends APIResponse {
  blogPosts: IPostAPI[];
}

export interface IPostsCountResponse extends APIResponse {
  blogPostsCount: number;
}

export interface ICommentResponse extends APIResponse {
  comment: ICommentAPI;
}

export interface ICommentsResponse extends APIResponse {
  comments: ICommentAPI[];
}

// Helpers

export interface IInputFields {
  [field: string]: {
    value: string;
    label: string;
    required: boolean;
    type: string;
  };
}
