import { faker } from '@faker-js/faker';
import { http, HttpResponse } from 'msw';
import type { PaginatedKubernetesClusters } from '../../src/resources/kubernetes/types';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/kubernetes/clusters`, () => {
    return HttpResponse.json(
      {
        page: 1,
        per_page: 15,
        pages: 1,
        items: [
          {
            id: faker.string.uuid(),
            network_id: faker.string.uuid(),
            conditions: [],
          },
        ],
      } satisfies PaginatedKubernetesClusters,
      {
        status: 200,
      },
    );
  }),
];
