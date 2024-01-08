import { faker } from '@faker-js/faker';
import { http, HttpResponse } from 'msw';

import { Subnet, SubnetConfig } from '../../src/resources/networks/types';
import { createNetwork, getSubnet } from '../utils';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/networks`, () => {
    return HttpResponse.json(
      Array.from({ length: 5 }).map(() => createNetwork()),
      { status: 200 },
    );
  }),

  http.get(
    `${import.meta.env.VITE_API_URL}/networks/:networkId/subnets`,
    ({ params }) => {
      const { networkId } = params;

      return HttpResponse.json(
        Array.from({ length: 5 }).map(() => getSubnet(networkId as string)),
        { status: 200 },
      );
    },
  ),

  http.get(
    `${import.meta.env.VITE_API_URL}/networks/:networkId/subnets/:subnetId`,
    ({ params }) => {
      const { networkId, subnetId } = params;

      return HttpResponse.json(
        getSubnet(networkId as string, subnetId as string),
        {
          status: 200,
        },
      );
    },
  ),

  http.post(`${import.meta.env.VITE_API_URL}/networks`, () => {
    return HttpResponse.json(
      { id: faker.string.uuid(), label: faker.lorem.word(), result: 'success' },
      { status: 201 },
    );
  }),

  http.post(
    `${import.meta.env.VITE_API_URL}/networks/:networkId/subnets`,
    async ({ params, request }) => {
      const { networkId } = params;

      const subnet = (await request.json()) as SubnetConfig;

      return HttpResponse.json(
        {
          id: faker.string.uuid(),
          network_id: networkId as string,
          name: subnet.name,
        } satisfies Subnet,
        {
          status: 201,
        },
      );
    },
  ),

  http.post(
    `${
      import.meta.env.VITE_API_URL
    }/networks/:networkId/subnets/:subnetId/routes`,
    ({ params }) => {
      const { networkId } = params;

      return HttpResponse.json(
        {
          id: faker.string.uuid(),
          network_id: networkId as string,
        } satisfies Subnet,
        { status: 201 },
      );
    },
  ),
];
