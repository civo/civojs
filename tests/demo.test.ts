import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { NetworksApi } from '../src/resources/networks';
import { Civo } from '../src/index';
import { beforeAll, afterEach, afterAll, test } from 'vitest';

const client = new Civo({
    apiKey: "test",
    regionCode: 'LON1',
});

const server = setupServer(
  rest.get('/networks', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: '1', name: 'Network 1' },
        { id: '2', name: 'Network 2' },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('lists all networks', async () => {
  const api = new NetworksApi();
  const networks = await api.list();
  expect(networks).toEqual([
    { id: '1', name: 'Network 1' },
    { id: '2', name: 'Network 2' },
  ]);
});