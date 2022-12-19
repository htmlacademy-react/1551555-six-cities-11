import { useState } from 'react';
import Card from '../../components/card/card';
import { Offer, SortName } from '../../types/types';
import HeaderLeft from '../../components/header-left/header-left';
import HeaderNav from '../../components/header-nav/header-nav';
import { Helmet } from 'react-helmet-async';
import { HeaderTitle, cities } from '../../const';
import Map from '../../components/map/map';
import FilterOffer from '../../components/filter-offer/filter-offer';
import { useAppSelector, useAppDispatch } from '../../hooks';
import {
  selectorOffers,
  getOffers,
  getOffersLoadingStatus,
} from '../../store/app-data/selectors';
import { getCity, getSort } from '../../store/app-process/selectors';
import SortList from '../../components/sort-list/sort-list';
import { activeSorting } from '../../store/app-process/app-process';
import OffersEmpty from '../../components/offers-empty/offers-empty';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

export default function MainScreen(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const filterOffers = useAppSelector(selectorOffers);
  const selectedCity = useAppSelector(getCity);
  const activeSort = useAppSelector(getSort);
  const isOffersDataLoading = useAppSelector(getOffersLoadingStatus);
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(
    undefined
  );
  const dispatch = useAppDispatch();
  const isOffersCityEmpty = filterOffers.length === 0;
  const onListItemHover = (listItemName: number) => {
    const currentOffer = offers.find((offer) => offer.id === listItemName);
    setSelectedOffer(currentOffer);
  };
  const onListItemHoverLeave = () => {
    setSelectedOffer(undefined);
  };

  const CityList = cities.map((cityData) => (
    <FilterOffer
      key={cityData.name}
      {...cityData}
      isActive={cityData.name === selectedCity}
    />
  ));

  const [filterCities] = useAppSelector((state) =>
    cities.filter((city) => city.name === selectedCity)
  );
  const onSortChange = (name: SortName) => {
    dispatch(activeSorting(name));
  };
  const offerList = filterOffers.map((offerData) => (
    <Card
      key={offerData.id}
      {...offerData}
      onListItemHover={onListItemHover}
      onMouseLeave={onListItemHoverLeave}
    />
  ));
  if (isOffersDataLoading && !isOffersCityEmpty) {
    return <LoadingScreen />;
  }
  return (
    <div className="page page--gray page--main">
      <Helmet>
        <title>
          {HeaderTitle['6Cities']} {HeaderTitle.Main}
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

      <main
        className={`page__main page__main--index ${
          isOffersCityEmpty ? 'page__main--index-empty' : ''
        }`}
      >
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">{CityList}</ul>
          </section>
        </div>
        <div className="cities">
          <div
            className={`cities__places-container container ${
              isOffersCityEmpty ? 'cities__places-container--empty' : ''
            }`}
          >
            {isOffersCityEmpty ? (
              <OffersEmpty city={selectedCity} />
            ) : (
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">
                  {filterOffers.length} places to stay in {selectedCity}
                </b>
                <SortList onChange={onSortChange} activeSort={activeSort} />
                <div className="cities__places-list places__list tabs__content">
                  {offerList}
                </div>
              </section>
            )}
            <div className="cities__right-section">
              {!isOffersCityEmpty && (
                <Map
                  city={filterCities}
                  offers={filterOffers}
                  selectedOffer={selectedOffer}
                />
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
