import { NameSpace } from '../../const';
import { State } from '../../types/state';
import { SortName } from '../../types/types';

export const getCity = (state: State): string => state[NameSpace.Process].city;
export const getSort = (state: State): SortName =>
  state[NameSpace.Process].sorting;
