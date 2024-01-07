import { faker } from '@faker-js/faker';
import { afterAll, afterEach, beforeAll, expect, test } from 'vitest';

import { server } from '../mocks/server';
import { NetworksApi, SubnetsApi } from '../src/resources';
import { CreateRoute, SubnetConfig } from '../src/resources/networks/types';

const config = {
  apiKey: faker.string.nanoid(),
  regionCode: 'LON1',
};
const api = new NetworksApi(config);
const subnetsApi = new SubnetsApi(config);

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('create a new network', async () => {
  const networks = await api.list();
  const newNetwork = await api.create(`test-${faker.internet.domainWord()}`);

  expect(networks.length).toBeGreaterThan(0);
  expect(newNetwork.result).toBe('success');
});

test('get all networks', async () => {
  const api = new NetworksApi(config);
  const networks = await api.list();

  expect(networks).toBeTruthy();
});

test('should list all subnets in a network', async () => {
  const networkId = '12345678-90ab-cdef-0123-456789abcdef';
  const subnets = await subnetsApi.list(networkId);

  expect(subnets.length).toBeGreaterThan(1);
});

test('should get a subnet by its ID', async () => {
  const networkId = '12345678-90ab-cdef-0123-456789abcdef';
  const subnetId = 'fedcba98-7654-3210-9876-543210fedcba';
  const subnet = await subnetsApi.get(networkId, subnetId);

  expect(subnet.id).toBe(subnetId);
});

test('should create a new subnet in a network', async () => {
  const networkId = '12345678-90ab-cdef-0123-456789abcdef';
  const subnetConfig: SubnetConfig = {
    name: 'My new subnet',
  };

  const subnet = await subnetsApi.create(networkId, subnetConfig);

  expect(subnet.name).toBe(subnetConfig.name);
});

test('should attach a subnet to an instance', async () => {
  const networkId = '12345678-90ab-cdef-0123-456789abcdef';
  const subnetId = 'fedcba98-7654-3210-9876-543210fedcba';
  const routeConfig: CreateRoute = {
    resource_id: '12345678-90ab-cdef-0123-456789abcdef',
    resource_type: '',
  };

  const route = await subnetsApi.attachToInstance(
    networkId,
    subnetId,
    routeConfig,
  );

  expect(route.network_id).toBe(networkId);
});

test.todo('should detach a subnet from an instance', async () => {});

test.todo('should delete a subnet', async () => {});
