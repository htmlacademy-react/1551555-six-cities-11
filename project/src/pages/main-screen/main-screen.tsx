import { useState } from 'react';
import Card from '../../components/card/card';
import { Offer } from '../../types/types';
import HeaderLeft from '../../components/header-left/header-left';
import HeaderNav from '../../components/header-nav/header-nav';
import { Helmet } from 'react-helmet-async';
import { HeaderTitle, cities } from '../../const';
import Map from '../../components/map/map';
import FilterOffer from '../../components/filter-offer/filter-offer';
import { useAppSelector } from '../../hooks';
import { selectorOffers, getOffers } from '../../store/app-data/selectors';
import { getCity } from '../../store/app-process/selectors';
import SortList from '../../components/sort-list/sort-list';

export default function MainScreen(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const filterOffers = useAppSelector(selectorOffers);
  const selectedCity = useAppSelector(getCity);
  const [selectedOffer, setSelectedOffer] = useState<Offer | undefined>(
    undefined
  );

  const onListItemHover = (listItemName: number) => {
    const currentOffer = offers.find((offer) => offer.id === listItemName);
    setSelectedOffer(currentOffer);
  };
  const onListItemHoverLeave = () => {
    setSelectedOffer(undefined);
  };

  const CityList = cities.map((cityData) => (
    <FilterOffer key={cityData.name} {...cityData} />
  ));

  const [filterCities] = useAppSelector((state) =>
    cities.filter((city) => city.name === selectedCity)
  );
  const onSortingChange = (name: SortName) => {
    dispatch(setSorting(name));
  };
  const offerList = filterOffers.map((offerData) => (
    <Card
      key={offerData.id}
      {...offerData}
      onListItemHover={onListItemHover}
      onMouseLeave={onListItemHoverLeave}
    />
  ));
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

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <ul className="locations__list tabs__list">{CityList}</ul>
          </section>
        </div>
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">
                {filterOffers.length} places to stay in {selectedCity}
              </b>
              <SortList onChange={onSortingChange} activeSorting={activeSorting}/>
              <div className="cities__places-list places__list tabs__content">
                {offerList}
              </div>
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map
                  city={filterCities}
                  offers={filterOffers}
                  selectedOffer={selectedOffer}
                />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
