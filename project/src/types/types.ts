import { Sorting } from '../const';

export type City = {
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  name: string;
};

export type Offer = {
  bedrooms: number;
  city: City;
  description: string;
  goods: [string];
  host: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  };
  id: number;
  images: [string];
  isFavorite: boolean;
  isPremium: boolean;
  location: {
    latitude: number;
    longitude: number;
    zoom: number;
  };
  maxAdults: number;
  previewImage: string;
  price: number;
  rating: number;
  title: string;
  type: string;
};

export type Offers = Offer[];

export type AppProps = {
  cities: City[];
  offers: Offer[];
};

export type Cities = City[];

export type Comment = {
  comment: string;
  date: string;
  id: number;
  rating: number;
  user: {
    avatarUrl: string;
    id: number;
    isPro: boolean;
    name: string;
  };
};

export type Comments = Comment[];
export type SortName = keyof typeof Sorting;
export type FavoriteAuth = Pick<Offer, 'id'> & { status: 1 | 0 }
