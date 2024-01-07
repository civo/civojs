import { http, HttpResponse } from 'msw';

import { createRandomRegion } from '../utils';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/regions`, () => {
    return HttpResponse.json(
      Array.from({ length: 5 }).map(() => createRandomRegion()),
      { status: 200 },
    );
  }),
];
