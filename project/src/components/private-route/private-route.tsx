import { AppRoute, AuthorizationStatus } from '../../const';
import { Navigate } from 'react-router-dom';

type PrivatRouteProps = {
  authorizationStatus: AuthorizationStatus;
  children: JSX.Element;
};

export default function PrivatRoute({
  authorizationStatus,
  children,
}: PrivatRouteProps): JSX.Element {
  return authorizationStatus === AuthorizationStatus.Auth ? (
    children
  ) : (
    <Navigate to={AppRoute.Login} />
  );
}
