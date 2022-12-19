import { SortName } from '../../types/types';
import { useState } from 'react';
import { Sorting } from '../../const';

type SortingListProps = {
  onChange: (name: SortName) => void;
  activeSort: SortName;
};

export default function SortList({ onChange, activeSort }: SortingListProps) {
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const handleToggleButtonClick = () => {
    setIsOpened((prevIsOpened) => !prevIsOpened);
  };
  const handleSortItemClick = (name: SortName) => {
    setIsOpened(false);
    onChange(name);
  };
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={handleToggleButtonClick}
      >
        {Sorting[activeSort]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      {isOpened && (
        <ul className="places__options places__options--custom places__options--opened">
          {(Object.entries(Sorting) as [SortName, Sorting][]).map(
            ([name, title]) => (
              <li
                className={`places__option${
                  name === activeSort ? ' places__option--active' : ''
                }`}
                tabIndex={0}
                key={name}
                onClick={() => handleSortItemClick(name)}
              >
                {title}
              </li>
            )
          )}
        </ul>
      )}
    </form>
  );
}
