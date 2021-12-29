export const url = {
  home: '/',
  logout: '/logout',
  login: '/login',
  signup: '/signup',
  create: '/create',
  article: '/article',
  demo: '/demo',
};

export const api = {
  logout: 'api/logout',
  login: 'api/login',
  signup: 'api/signup',
  user: 'api/user',
  register_article: 'api/registerArticle',
};

export const privateMenu = [
  { id: '1', displayName: 'Logout', to: url.logout },
  { id: '2', displayName: 'Article', to: url.article },
  { id: '3', displayName: 'Create', to: url.create },
  { id: '4', displayName: 'Page', to: url.demo },
];
export const publicMenu = [
  { id: '1', displayName: 'Login', to: url.login },
  { id: '2', displayName: 'Article', to: url.article },
];

export const config = {
  bucketName: process.env.NEXT_PUBLIC_S3_BUCKET,
  region: process.env.NEXT_PUBLIC_REGION,
  accessKeyId: process.env.NEXT_PUBLIC_ACCESS_KEY,
  secretAccessKey: process.env.NEXT_PUBLIC_SECRET_ACCESS_KEY,
};
