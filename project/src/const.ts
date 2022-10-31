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

export enum HeaderTitle {
  '6Cities'='6 Cities:',
  Main='Главная cтраница',
  Authorization='Авторизуйтись',
  Favorites='Избранное',
  Offer='Предложение',
}
