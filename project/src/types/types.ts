export type Offer = {
  id: string;
  cityName:string;
  image: string;
  price: number;
  name: string;
  type: string;
  lat: number;
  lng: number;
};

export type City = {
  name: string;
  lat: number;
  lng: number;
  zoom: number;
};

export type Offers = Offer[];

export type AppProps = {
  cities: City[];
  offers: Offer[];
};

export type Cities = City[];
