import { useAppDispatch } from '../../hooks';
import { activeCity } from '../../store/app-process/app-process';
import { SyntheticEvent } from 'react';
import { City } from '../../types/types';

export default function FilterOffer({ name }: City) {
  const dispatch = useAppDispatch();
  return (
    <li
      className="locations__item"
      onClick={(e: SyntheticEvent) => dispatch(activeCity(name))}
    >
      <a className="locations__item-link tabs__item" href="#">
        <span> {name}</span>
      </a>
    </li>
  );
}
