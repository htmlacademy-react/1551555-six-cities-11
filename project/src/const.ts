export enum AppRoute {
  Main = '/',
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer/:id',
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NOAUTH',
  Unknown = 'UNKNOWN',
}

export const HEADERTITLE = [
  '6 cities:',
  'Главная cтраница',
  'Авторизуйтись',
  'Избранное',
  'Предложение',
];
