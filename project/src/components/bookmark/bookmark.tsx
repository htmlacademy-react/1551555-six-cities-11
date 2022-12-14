import { Offer } from '../../types/types';

import { useAppDispatch } from '../../hooks';
import { postFavoriteOffer } from '../../store/api-actions';
import { getAuthorizationStatus } from '../../store/user-process/selectors';
import { AuthorizationStatus } from '../../const';
import { redirectToRoute } from '../../store/action';
import { AppRoute } from '../../const';
import { useAppSelector } from '../../hooks';

type BookmarkProps = {
  id: Offer['id'];
  isActive: boolean;
  place?: 'place-card' | 'property';
};

export default function Bookmark({
  id,
  isActive,
  place = 'place-card',
}: BookmarkProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleButtonClick = () => {
    if (authorizationStatus === AuthorizationStatus.Auth) {
      dispatch(
        postFavoriteOffer({
          id,
          status: isActive ? 0 : 1,
        })
      );
    } else {
      dispatch(redirectToRoute(AppRoute.Login));
    }
  };

  return (
    <button
      onClick={handleButtonClick}
      className={`${place}__bookmark-button button${
        isActive ? ` ${place}__bookmark-button--active` : ''
      }`}
      type="button"
    >
      <svg
        className="place-card__bookmark-icon"
        width={place === 'property' ? 31 : 18}
        height={place === 'property' ? 33 : 19}
      >
        <use xlinkHref="#icon-bookmark"></use>
      </svg>
      <span className="visually-hidden">
        {isActive ? 'From' : 'To'} bookmarks
      </span>
    </button>
  );
}
