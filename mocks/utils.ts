import { faker } from '@faker-js/faker';

import { Network, Subnet, SubnetConfig } from '../src/resources/networks/types';
import { Region } from '../src/resources/regions/types';

export function createRandomRegion(): Region {
  const country = faker.location.countryCode();
  const country_name = faker.location.country();

  return {
    code: faker.helpers.arrayElement(['LON1', 'NYC1']),
    name: faker.location.city(),
    type: faker.helpers.arrayElement(['civostack', 'otherstack']),
    default: faker.datatype.boolean(),
    out_of_capacity: faker.datatype.boolean(),
    country,
    country_name,
    features: {
      iaas: faker.datatype.boolean(),
      kubernetes: faker.datatype.boolean(),
      object_store: faker.datatype.boolean(),
      loadbalancer: faker.datatype.boolean(),
      dbaas: faker.datatype.boolean(),
      volume: faker.datatype.boolean(),
      paas: faker.datatype.boolean(),
      kfaas: faker.datatype.boolean(),
      public_ip_node_pools: faker.datatype.boolean(),
    },
  };
}

export function createNetwork() {
  return {
    default: faker.datatype.boolean(),
    id: faker.string.uuid(),
    name: faker.internet.domainWord(),
  } satisfies Network;
}

export function createSubnet(networkId: string, data: SubnetConfig) {
  return {
    id: faker.string.uuid(),
    network_id: networkId,
    name: data.name,
  } satisfies Subnet;
}

export function getSubnet(networkId: string, subnetId?: string) {
  return {
    id: subnetId ?? faker.string.uuid(),
    network_id: networkId,
    name: faker.internet.domainWord(),
  } satisfies Subnet;
}
