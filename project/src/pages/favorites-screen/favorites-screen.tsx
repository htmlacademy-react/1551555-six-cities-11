import HeaderLeft from '../../components/header-left/header-left';
import HeaderNav from '../../components/header-nav/header-nav';
import { Helmet } from 'react-helmet-async';
import { AppRoute, HeaderTitle } from '../../const';
import CardFavorites from '../../components/card-favorits/card-favorites';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';

export default function FavoritesScreen(): JSX.Element {
  const offers = useAppSelector((state) => state.offers);
  const offerList = offers.map((filmData) => (
    <CardFavorites key={filmData.id} {...filmData} />
  ));
  return (
    <div className="page">
      <Helmet>
        <title>
          {HeaderTitle['6Cities']} {HeaderTitle.Favorites}
        </title>
      </Helmet>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <HeaderLeft />
            <HeaderNav />
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places">{offerList}</div>
              </li>

              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="#">
                      <span>Cologne</span>
                    </a>
                  </div>
                </div>
                <div className="favorites__places"></div>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <footer className="footer container">
        <Link className="footer__logo-link" to={AppRoute.Main}>
          <img
            className="footer__logo"
            src="img/logo.svg"
            alt="6 cities logo"
            width="64"
            height="33"
          />
        </Link>
      </footer>
    </div>
  );
}
