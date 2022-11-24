import { City } from '../../types/types';
import { useAppDispatch } from '../../hooks';
import { activeCity } from '../../store/action';
import { SyntheticEvent } from 'react';

export default function FilterOffer({ name }: City) {
  const dispatch = useAppDispatch();
  return (
    <li
      className="locations__item"
      onClick={(e: SyntheticEvent) => dispatch(activeCity(name))}
    >
      <a className="locations__item-link tabs__item" href="#">
        <span>{name}</span>
      </a>
    </li>
  );
}
