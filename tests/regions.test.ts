import { afterAll, afterEach, beforeAll, expect, test } from 'vitest';
import { server } from '../mocks/server';
import { RegionsApi } from '../src/resources';

const config = {
  apiKey: 'akjsdhjksadka',
  regionCode: 'LON1',
};

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('get all regions', async () => {
  const api = new RegionsApi(config);
  const regions = await api.list();

  expect(regions.length).toBeGreaterThan(0);
});
