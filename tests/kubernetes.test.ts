import { faker } from '@faker-js/faker';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, expect, test } from 'vitest';
import { Civo } from '../src';

const config = {
  apiKey: faker.string.nanoid(),
  regionCode: 'LON1',
};

const handlers = [
  http.get('https://api.civo.com/v2/kubernetes/clusters', () => {
    return HttpResponse.json([{}], { status: 200 });
  }),
];
const server = setupServer(...handlers);

const civo = new Civo(config);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('create a new cluster', async () => {
  const clusters = await civo.kubernetes.listClusters();
  if (clusters.items.length === 0) {
    const cluster = await civo.kubernetes.createCluster({
      name: 'mycluster',
      network_id: faker.string.uuid(),
    });
    expect(cluster).toBeTruthy();
  }

  expect(clusters.items[0].network_id).toBeTypeOf('string');
  expect(clusters.items.length).toBeGreaterThan(0);
});

test('get all clusters', async () => {
  const clusters = await civo.kubernetes.listClusters();

  expect(clusters).toBeTruthy();
});
