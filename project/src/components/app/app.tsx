import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import Error404 from '../../pages/error-404/error-404';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivateRoute from '../private-route/private-route';
import { AppProps } from '../../types/types';
import { HelmetProvider } from 'react-helmet-async';
// import { offers} from '../../mocks/offers';
// import { cities } from '../../mocks/city';

export default function App(
  //   {
  //   offers,
  // }: {
  //   offers: Offer[];
  // }
  props: AppProps
): JSX.Element {
  const { city, offers } = props;

  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainScreen offers={offers} city={city} />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivateRoute authorizationStatus={AuthorizationStatus.Auth}>
                <FavoritesScreen offers={offers} />
              </PrivateRoute>
            }
          />
          <Route path={AppRoute.Room} element={<PropertyScreen />} />
          <Route path={AppRoute.Login} element={<LoginScreen />} />
          <Route path="*" element={<Error404 />} />
        </Routes>
      </BrowserRouter>
    </HelmetProvider>
  );
}
