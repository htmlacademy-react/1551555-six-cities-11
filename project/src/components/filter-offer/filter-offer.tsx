import { useAppDispatch } from '../../hooks';
import { activeCity } from '../../store/app-process/app-process';
import { SyntheticEvent } from 'react';
import { City } from '../../types/types';

type CityProps = {
  name: City['name'];
  isActive: boolean;
};

export default function FilterOffer({ name, isActive }: CityProps) {
  const dispatch = useAppDispatch();
  return (
    <li
      className="locations__item"
      onClick={(e: SyntheticEvent) => dispatch(activeCity(name))}
    >
      <a
        className={`locations__item-link tabs__item${
          isActive ? ' tabs__item--active' : ''
        }`}
        href="#"
      >
        <span> {name}</span>
      </a>
    </li>
  );
}
