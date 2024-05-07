import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, expect, test } from 'vitest';
import { Civo } from '../src';

const handlers = [
  http.get('https://api.civo.com/regions', () => {
    return HttpResponse.json([{}], { status: 200 });
  }),
];
const server = setupServer(...handlers);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('get all regions', async () => {
  const civo = new Civo({ apiKey: 'kdbsfjbdjbsdjfbjsdb', regionCode: 'LON1' });
  const regions = await civo.regions.list();

  expect(regions.length).toBeGreaterThan(0);
});
