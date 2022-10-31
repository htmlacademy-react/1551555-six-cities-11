import { Offer } from '../../types/types';
import { offers } from '../../mocks/offers';
import Card from '../card/card';

export default function ListOffer({offers}:{offers:Offer[]}):JSX.Element{
return ({offers.map(item => 
  <Card key={item.id} />
)}}) ;
};
