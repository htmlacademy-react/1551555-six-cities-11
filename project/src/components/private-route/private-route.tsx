import { AppRoute, AuthorizationStatus } from '../../const';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

type PrivatRouteProps = {
  privatFor: AuthorizationStatus;
  children: JSX.Element;
  redirectTo: AppRoute;
};

export default function PrivatRoute({
  privatFor,
  children,
  redirectTo,
}: PrivatRouteProps): JSX.Element {
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  if (authorizationStatus === AuthorizationStatus.Unknown) {
    return <LoadingScreen />;
  }

  return authorizationStatus !== privatFor ? (
    children
  ) : (
    <Navigate to={redirectTo} />
  );
}
