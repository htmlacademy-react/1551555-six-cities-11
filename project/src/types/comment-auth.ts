import { Comment, Offer } from './types';

export type CommentAuth = Pick<Comment, 'comment' | 'rating'> &
  Pick<Offer, 'id'>;
