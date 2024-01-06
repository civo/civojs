import { expect, test } from 'vitest';

import { Civo } from '../src';

const client = new Civo({
  apiKey: import.meta.env.API_KEY,
  regionCode: 'LON1',
});

test('get all regions', async () => {
  const regions = await client.regions.list();

  expect(regions.length).toBeGreaterThan(0);
});
