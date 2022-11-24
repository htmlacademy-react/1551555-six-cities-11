import { createAction } from '@reduxjs/toolkit';

export const activeCity = createAction('activeCity', (city: string) => ({
  payload: city,
}));
