import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { afterAll, afterEach, beforeAll, expect, test } from 'vitest';
import { Civo } from '../src/index';
import { NetworksApi } from '../src/resources/networks';

const config = {
	apiKey: 'test',
	regionCode: 'LON1',
};

const server = setupServer(
	rest.get('/networks', (req, res, ctx) => {
		return res(
			ctx.json([
				{ id: '1', name: 'Network 1' },
				{ id: '2', name: 'Network 2' },
			]),
		);
	}),
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('lists all networks', async () => {
	const api = new NetworksApi(config);
	const networks = await api.list();
	expect(networks).toEqual([
		{ id: '1', name: 'Network 1' },
		{ id: '2', name: 'Network 2' },
	]);
});
