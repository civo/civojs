import { faker } from '@faker-js/faker';
import { afterAll, afterEach, beforeAll, expect, test } from 'vitest';
import { server } from '../mocks/server';
import { KubernetesApi, NetworksApi } from '../src/resources';

const config = {
  apiKey: faker.string.nanoid(),
  regionCode: 'LON1',
};
const napi = new NetworksApi(config);
const kapi = new KubernetesApi(config);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('create a new cluster', async () => {
  const clusters = await kapi.listClusters();
  if (clusters.items.length === 0) {
    const cluster = await kapi.createCluster({
      name: 'mycluster',
      network_id: faker.string.uuid(),
    });
    expect(cluster).toBeTruthy();
  }

  expect(clusters.items[0].network_id).toBeTypeOf('string');
  expect(clusters.items.length).toBeGreaterThan(0);
});

test('get all clusters', async () => {
  const clusters = await kapi.listClusters();

  expect(clusters).toBeTruthy();
});
