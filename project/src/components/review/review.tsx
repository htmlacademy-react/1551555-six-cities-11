import { useState, ChangeEvent } from 'react';

export default function Review() {
  const [review, setReview] = useState('');
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };
  return (
    <>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        placeholder="Tell how was your stay, what you like and what can be improved"
        defaultValue={''}
        onChange={handleTextareaChange}
        value={review}
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
          // disabled
        >
          Submit
        </button>
      </div>
    </>
  );
}
