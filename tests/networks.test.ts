import { afterAll, afterEach, beforeAll, expect, test } from 'bun:test';
import { faker } from '@faker-js/faker';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { Civo, type CreateRoute, type SubnetConfig } from '../src';

const config = {
  apiKey: faker.string.nanoid(),
  regionCode: 'LON1',
};

const handlers = [
  http.get('https://api.civo.com/v2/networks', () => {
    return HttpResponse.json({});
  }),
  http.get('https://api.civo.com/v2/networks/**/subnets', () => {
    return HttpResponse.json({});
  }),
  http.get('https://api.civo.com/v2/networks/**/subnets/**', () => {
    return HttpResponse.json({});
  }),
  http.get('https://api.civo.com/v2/networks/**/subnets/**/routes', () => {
    return HttpResponse.json({});
  }),
];
const server = setupServer(...handlers);

const civo = new Civo(config);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('create a new network', async () => {
  const networks = await civo.networks.list();
  const newNetwork = await civo.networks.create(
    `test-${faker.internet.domainWord()}`,
  );

  expect(networks.length).toBeGreaterThan(0);
  expect(newNetwork.result).toBe('success');
});

test('get all networks', async () => {
  const networks = await civo.networks.list();

  expect(networks).toBeTruthy();
});

test('should list all subnets in a network', async () => {
  const networkId = '12345678-90ab-cdef-0123-456789abcdef';
  const subnets = await civo.subnets.list(networkId);

  expect(subnets.length).toBeGreaterThan(1);
});

test('should get a subnet by its ID', async () => {
  const networkId = '12345678-90ab-cdef-0123-456789abcdef';
  const subnetId = 'fedcba98-7654-3210-9876-543210fedcba';
  const subnet = await civo.subnets.get(networkId, subnetId);

  expect(subnet.id).toBe(subnetId);
});

test('should create a new subnet in a network', async () => {
  const networkId = '12345678-90ab-cdef-0123-456789abcdef';
  const subnetConfig: SubnetConfig = {
    name: 'My new subnet',
  };

  const subnet = await civo.subnets.create(networkId, subnetConfig);

  expect(subnet.name).toBe(subnetConfig.name);
});

test('should attach a subnet to an instance', async () => {
  const networkId = '12345678-90ab-cdef-0123-456789abcdef';
  const subnetId = 'fedcba98-7654-3210-9876-543210fedcba';
  const routeConfig: CreateRoute = {
    resource_id: '12345678-90ab-cdef-0123-456789abcdef',
    resource_type: '',
  };

  const route = await civo.subnets.attachToInstance(
    networkId,
    subnetId,
    routeConfig,
  );

  expect(route.network_id).toBe(networkId);
});

test.todo('should detach a subnet from an instance', async () => {});

test.todo('should delete a subnet', async () => {});
