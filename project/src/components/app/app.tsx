import MainScreen from '../../pages/main-screen/main-screen';
import LoginScreen from '../../pages/login-screen/login-screen';
import FavoritesScreen from '../../pages/favorites-screen/favorites-screen';
import PropertyScreen from '../../pages/property-screen/property-screen';
import Error404 from '../../pages/error-404/error-404';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivatRoute from '../private-route/private-route';
import { Offer } from '../../types/types';
import { HelmetProvider } from 'react-helmet-async';

export default function App({
  propsOffers,
}: {
  propsOffers: Offer[];
}): JSX.Element {
  return (
    <HelmetProvider>
      <BrowserRouter>
        <Routes>
          <Route
            path={AppRoute.Main}
            element={<MainScreen offers={propsOffers} />}
          />
          <Route
            path={AppRoute.Favorites}
            element={
              <PrivatRoute authorizationStatus={AuthorizationStatus.NoAuth}>
                <FavoritesScreen />
              </PrivatRoute>
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
