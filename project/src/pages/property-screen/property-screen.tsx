import HeaderLeft from '../../components/header-left/header-left';
import HeaderNav from '../../components/header-nav/header-nav';
import { Helmet } from 'react-helmet-async';
import { HeaderTitle, AuthorizationStatus } from '../../const';
import ReviewsItem from '../../components/reviews-item/reviews-item';
import Review from '../../components/review/review';
import { useAppSelector } from '../../hooks';
import {
  limitingComments,
  getNearbyOffers,
  getOffer,
  getOfferLoadingStatus,
} from '../../store/app-data/selectors';
import Map from '../../components/map/map';
import LoadingScreen from '../loading-screen/loading-screen';
import Card from '../../components/card/card';
import { store } from '../../store';
import {
  fetchOfferAction,
  fetchCommentsAction,
  fetchNearbyOffers,
} from '../../store/api-actions';
import { useParams } from 'react-router-dom';
import { useAppDispatch } from '../../hooks';
import { useEffect } from 'react';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import Bookmark from '../../components/bookmark/bookmark';
import Error404 from '../error-404/error-404';

export default function PropertyScreen(): JSX.Element | null {
  const offer = useAppSelector(getOffer);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const reviews = useAppSelector(limitingComments);
  const nearbyOffers = useAppSelector(getNearbyOffers);
  const { id } = useParams();
  const isOfferLoading = useAppSelector(getOfferLoadingStatus);
  const dispatch = useAppDispatch();

  const nearbyCards = nearbyOffers.map((card) => (
    <Card key={card.id} {...card} />
  ));
  const reviewsList = reviews.map((review) => (
    <ReviewsItem key={review.id} {...review} />
  ));
  useEffect(() => {
    if (id) {
      const paramId = Number(id);
      store.dispatch(fetchOfferAction(paramId));
      store.dispatch(fetchCommentsAction(paramId));
      store.dispatch(fetchNearbyOffers(paramId));
    }
  }, [id, dispatch]);

  if (isOfferLoading) {
    return <LoadingScreen />;
  }

  if (!offer) {
    return <Error404 />;
  }

  const {
    title,
    images,
    isPremium,
    rating,
    type,
    bedrooms,
    maxAdults,
    price,
    goods,
    host,
    description,
    city,
    isFavorite,
  } = offer;

  const allPoints = [...nearbyOffers, offer];

  return (
    <div className="page">
      <Helmet>
        <title>
          {HeaderTitle['6Cities']} {HeaderTitle.Offers}
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
      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image) => (
                <div className="property__image-wrapper" key={image}>
                  <img
                    className="property__image"
                    src={image}
                    alt="Photo studio"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">{title}</h1>
                <Bookmark
                  id={Number(id)}
                  isActive={isFavorite}
                  place="property"
                />
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{ width: '80%' }} />
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">
                  {rating}
                </span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">€{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&#39s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((good) => (
                    <li className="property__inside-item" key={good}>
                      {good}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img
                      className="property__avatar user__avatar"
                      src={host.avatarUrl}
                      width={74}
                      height={74}
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{host.name}</span>
                  {host.isPro && (
                    <span className="property__user-status">Pro</span>
                  )}
                </div>
                <div className="property__description">
                  <p className="property__text">{description}</p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">
                  Reviews
                  <span className="reviews__amount">{reviewsList.length}</span>
                </h2>
                {reviewsList}

                {authorizationStatus === AuthorizationStatus.Auth && <Review />}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map
              city={city}
              offers={allPoints}
              selectedOffer={offer}
              place="property"
            />
          </section>
        </section>

        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">{nearbyCards}</div>
          </section>
        </div>
      </main>
    </div>
  );
}
