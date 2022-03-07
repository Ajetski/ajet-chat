declare namespace GraphQL {
export type Maybe<T> = T | null;


/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Login = {
   __typename?: 'Login';
  user?: Maybe<User>;
  token?: Maybe<Scalars['Int']>;
};

export type Mutation = {
   __typename?: 'Mutation';
  register: Login;
  login: Login;
};


export type MutationRegisterArgs = {
  userInfo: UserInfo;
};


export type MutationLoginArgs = {
  username: Scalars['String'];
  password: Scalars['String'];
};

export type PageInfo = {
  length: Scalars['Int'];
  pageNumber: Scalars['Int'];
};

export type Post = {
   __typename?: 'Post';
  id: Scalars['Int'];
  text: Scalars['String'];
  poster: User;
};

export type Query = {
   __typename?: 'Query';
  currentUser?: Maybe<User>;
  users: Array<User>;
  posts: Array<Post>;
};


export type QueryUsersArgs = {
  pageInfo?: Maybe<PageInfo>;
};


export type QueryPostsArgs = {
  pageInfo?: Maybe<PageInfo>;
};

export type User = {
   __typename?: 'User';
  id: Scalars['Int'];
  username: Scalars['String'];
  posts: Array<Post>;
  lengthOfUsername: Scalars['Int'];
  age?: Maybe<Scalars['Int']>;
};

export type UserInfo = {
  username: Scalars['String'];
  password: Scalars['String'];
  age?: Maybe<Scalars['Int']>;
};

}