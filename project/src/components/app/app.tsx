import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import Error404 from '../../pages/error-404/error-404';
import { Route, Routes } from 'react-router-dom';
import { AppRoute } from '../../const';
import PrivateRoute from '../private-route/private-route';
import { HelmetProvider } from 'react-helmet-async';
import { AuthorizationStatus } from '../../const';
import HistoryRouter from '../history-route/history-route';
import browserHistory from '../../browser-history';

export default function App(): JSX.Element {
  return (
    <HelmetProvider>
      <HistoryRouter history={browserHistory}>
        <Routes>
          <Route path={AppRoute.Main} element={<MainScreen />} />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute
                privatFor={AuthorizationStatus.NoAuth}
                redirectTo={AppRoute.Login}
              >
                <FavoritesScreen />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Room} element={<PropertyScreen />} />
          <Route
            path={AppRoute.Login}
            element={
              <PrivateRoute
                privatFor={AuthorizationStatus.Auth}
                redirectTo={AppRoute.Main}
              >
                <LoginScreen />
              </PrivateRoute>
            }
          />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </HistoryRouter>
    </HelmetProvider>
  );
}
