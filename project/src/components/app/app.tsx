import MainScreen from '../../pages/main-screen';
import LoginScreen from '../../pages/login-screen';
import FavoritesScreen from '../../pages/favorites-screen';
import PropertyScreen from '../../pages/property-screen';
import Error404 from '../../pages/error-404/error-404';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AppRoute, AuthorizationStatus } from '../../const';
import PrivatRoute from '../private-route/private-route';

type AppScreenProps = {
  offersCount: number | null;
};

function App({ offersCount }: AppScreenProps): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={<MainScreen offersCount={offersCount} />}
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
  );
}

export default App;
