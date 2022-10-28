import MainScreen from '../../pages/main-screen/main-screen';
import { Offer } from '../../types/types';

export default function App({
  propsOffers,
}: {
  propsOffers: Offer[];
}): JSX.Element {
  return <MainScreen offers={propsOffers} />;
}
