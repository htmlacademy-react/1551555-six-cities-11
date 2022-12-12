import { useState, ChangeEvent, SyntheticEvent, Fragment } from 'react';
import { useAppDispatch } from '../../hooks';
import { postCommentAction } from '../../store/api-actions';
import { getCommentStatus } from '../../store/app-data/selectors';
import { useAppSelector } from '../../hooks';
import { useParams } from 'react-router-dom';
import {
  STARS_COUNT,
  MIN_COMMENT_LENGTH,
  MAX_COMMENT_LENGTH,
  SubmitStatus,
} from '../../const';
import { useEffect } from 'react';

export default function Review() {
  const dispatch = useAppDispatch();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(0);
  const commentStatus = useAppSelector(getCommentStatus);
  const isSubmiting = commentStatus === SubmitStatus.Pending;
  const { id } = useParams();
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };

  const handleRatingChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRating(Number(e.target.value));
  };
  const onFormSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      postCommentAction({ comment: review, rating: rating, id: Number(id) })
    );
  };
  useEffect(() => {
    if (commentStatus === SubmitStatus.Fullfilled) {
      setReview('');
      setRating(0);
    }
  }, [commentStatus]);
  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={onFormSubmit}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>

      <div className="reviews__rating-form form__rating">
        {Array.from({ length: STARS_COUNT }, (_, i) => (
          <Fragment key={`Star ${STARS_COUNT - i}`}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              defaultValue={STARS_COUNT - i}
              id={`${STARS_COUNT - i}-stars`}
              type="radio"
              checked={STARS_COUNT - i === rating}
              onChange={handleRatingChange}
              disabled={isSubmiting}
            />
            <label
              htmlFor={`${STARS_COUNT - i}-stars`}
              className="reviews__rating-label form__rating-label"
            >
              <svg className="form__star-image" width={37} height={33}>
                <use xlinkHref="#icon-star" />
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={handleTextareaChange}
        value={review}
        disabled={isSubmiting}
      />
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={
            isSubmiting ||
            !rating ||
            review.length < MIN_COMMENT_LENGTH ||
            review.length > MAX_COMMENT_LENGTH
          }
        >
          Submit
        </button>
      </div>
    </form>
  );
}
