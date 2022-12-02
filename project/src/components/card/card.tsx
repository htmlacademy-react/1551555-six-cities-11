import { SyntheticEvent } from 'react';
import { AppRoute } from '../../const';
import { Link } from 'react-router-dom';
import { Offer } from '../../types/types';

type OfferProps = Offer & {
  onListItemHover: (listItemName: number) => void;
  onMouseLeave: () => void;
};

export default function Card({
  previewImage,
  price,
  title,
  type,
  id,
  onListItemHover,
  onMouseLeave = () => void 0,
}: OfferProps): JSX.Element {
  const handleListItemMouseenter = (e: SyntheticEvent) => {
    e.preventDefault();
    onListItemHover(id);
  };

  return (
    <article
      className="cities__card place-card"
      onMouseEnter={handleListItemMouseenter}
      onMouseLeave={onMouseLeave}
    >
      <div className="cities__image-wrapper place-card__image-wrapper">
        <Link to={AppRoute.Room}>
          <img
            className="place-card__image"
            src={previewImage}
            width="260"
            height="200"
            alt="Place image"
          />
        </Link>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className="place-card__bookmark-button place-card__bookmark-button--active button"
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">In bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{ width: '80%' }}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={AppRoute.Room}>{title}</Link>
        </h2>
        <p className="place-card__type">{type}</p>
      </div>
    </article>
  );
}
