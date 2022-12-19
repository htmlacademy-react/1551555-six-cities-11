import HeaderLeft from '../../components/header-left/header-left';
import HeaderNav from '../../components/header-nav/header-nav';
import { Helmet } from 'react-helmet-async';
import { AppRoute, HeaderTitle } from '../../const';
import CardFavorites from '../../components/card-favorits/card-favorites';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../hooks';
import {
  getFavoriteOffers,
  getFavoriteOffersLoadingStatus,
} from '../../store/app-data/selectors';
import { Offers } from '../../types/types';
import LoadingScreen from '../loading-screen/loading-screen';

export default function FavoritesScreen(): JSX.Element {
  const isFavoriteOffersLoading = useAppSelector(
    getFavoriteOffersLoadingStatus
  );
  const favoriteOffers = useAppSelector(getFavoriteOffers);

  const groupedOffersByCity = favoriteOffers.reduce<{ [key: string]: Offers }>(
    (acc, curr) => {
      if (curr.isFavorite) {
        const city = curr.city.name;

        if (!(city in acc)) {
          acc[city] = [];
        }

        acc[city].push(curr);
      }

      return acc;
    },
    {}
  );

  if (isFavoriteOffersLoading) {
    return <LoadingScreen/>;
  }
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
              {Object.entries(groupedOffersByCity).map(
                ([city, groupedOffers]) => (
                  <li className="favorites__locations-items" key={city}>
                    <div className="favorites__locations locations locations--current">
                      <div className="locations__item ">
                        <a className="locations__item-link" href="#">
                          <span>{city}</span>
                        </a>
                      </div>
                    </div>
                    <div className="favorites__places">
                      {groupedOffers.map((offerData) => (
                        <CardFavorites key={offerData.id} {...offerData} />
                      ))}
                    </div>
                  </li>
                )
              )}
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
