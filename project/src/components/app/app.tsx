import MainScreen from '../../pages/main-screen';

type AppScreenProps = {
  offersCount: number|null;
}

function App({offersCount}:AppScreenProps): JSX.Element {
  return <MainScreen offersCount={offersCount}/>;
}

export default App;
