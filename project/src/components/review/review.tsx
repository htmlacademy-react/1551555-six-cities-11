import { useState, ChangeEvent } from 'react';

export default function Review() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [review, setReview] = useState('');
  const handleTextareaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setReview(e.target.value);
  };
  return (
    <textarea
      className="reviews__textarea form__textarea"
      id="review"
      name="review"
      placeholder="Tell how was your stay, what you like and what can be improved"
      defaultValue={''}
      onChange={handleTextareaChange}
      value={review}
    />
  );
}
