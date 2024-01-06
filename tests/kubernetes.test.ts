// FILEPATH: /workspaces/civojs/tests/kubernetes.test.ts

import { KubernetesApi } from '../src/resources/kubernetes';
import nock from 'nock';
import { test } from 'vitest';
import { beforeEach, afterEach, expect } from 'vitest';

let api: KubernetesApi;

beforeEach(() => {
  api = new KubernetesApi({
    apiKey: 'test',
    regionCode: 'LON1',
  });
});

afterEach(() => {
  nock.cleanAll();
});

test('listClusters', async () => {
  nock('https://api.civo.com/v2/')
    .get('/kubernetes/clusters')
    .reply(200, { items: [] });

  const clusters = await api.listClusters();
  expect(clusters.items).toEqual([]);
});