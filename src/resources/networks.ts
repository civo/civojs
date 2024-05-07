import { CivoAPIError, CivoNotFoundError } from '../error';
import type {
  CreateRoute,
  Network,
  NetworkConfig,
  NetworkResult,
  SimpleResponse,
  Subnet,
  SubnetConfig,
} from '../types';
import BaseResource from './base';

export class NetworksResource extends BaseResource {
  /**
   * Lists all networks.
   *
   * @returns A promise that resolves to an array of networks.
   */
  async list() {
    const path = '/networks';
    return await this.client.request<Network[]>('GET', path);
  }

  /**
   * Gets the default network.
   *
   * @returns A promise that resolves to the default network.
   */
  async getDefault() {
    const networks = await this.list();
    const defaultNetwork = networks.find((network) => network.default);
    if (!defaultNetwork) {
      throw new CivoNotFoundError('Default network not found');
    }
    return defaultNetwork;
  }

  /**
   * Gets the network with the specified ID.
   *
   * @param id The ID of the network.
   *
   * @returns A promise that resolves to the network with the specified ID.
   */
  async get(id: string) {
    const path = `/networks/${id}`;

    const network = await this.client.request<Network>('GET', path);

    if (network) {
      return network;
    }

    throw new CivoNotFoundError('Network not found');
  }

  /**
   * Creates a new network.
   *
   * @param label The label of the network.
   *
   * @returns A promise that resolves to the newly created network.
   */
  async create(label: string): Promise<NetworkResult>;
  async create(body: NetworkConfig): Promise<NetworkResult>;
  async create(data: unknown): Promise<NetworkResult> {
    type Body = { label?: string; region?: string };
    let body: Body = {};

    if (typeof data === 'string') {
      body.label = data;
      body.region = this.client.regionCode;
    } else if (typeof data === 'object') {
      body = { ...data };
    }

    return await this.client.request('POST', '/networks', body);
  }

  /**
   * Finds a network by the specified search term.
   *
   * @param search The search term.
   *
   * @returns A promise that resolves to the network that matches the search term.
   */
  async find(search: string) {
    const lowerCaseSearch = search.toLowerCase();
    const networks = await this.list();

    const found = networks.find((network) => {
      const id = network.id.toLowerCase();
      const name = network.name?.toLowerCase();
      const label = network.label?.toLowerCase();

      if (
        id.includes(lowerCaseSearch) ||
        name?.includes(lowerCaseSearch) ||
        label?.includes(lowerCaseSearch)
      ) {
        return network;
      }
    });

    if (found) {
      return found;
    }

    throw new CivoAPIError(`Unable to find ${search}, zero matches`);
  }

  /**
   * Renames the network with the specified ID.
   *
   * @param id The ID of the network.
   * @param label The new label of the network.
   *
   * @returns A promise that resolves to the renamed network.
   */
  async rename(id: string, label: string) {
    const path = `/networks/${id}`;
    const body = {
      label: label,
      region: this.client.regionCode,
    };

    return await this.client.request<NetworkResult>('POST', path, body);
  }

  /**
   * Deletes the network with the specified ID.
   *
   * @param id The ID of the network.
   *
   * @returns A promise that resolves when the network has been deleted.
   */
  async destroy(id: string) {
    const path = `/networks/${id}`;

    await this.client.request('DELETE', path);
  }

  /**
   * Updates the network with the specified ID.
   *
   * @param id The ID of the network.
   * @param data The new data for the network.
   *
   * @returns A promise that resolves to the updated network.
   */
  update(id: string, data: NetworkConfig) {
    const path = `/networks/${id}`;

    return this.client.request<NetworkResult>('PUT', path, data);
  }
}

export class SubnetsResource extends BaseResource {
  /**
   * Lists all subnets in a network.
   *
   * @param networkId The ID of the network.
   * @returns A promise for an array of subnets.
   */
  list(networkId: string) {
    const path = `/networks/${networkId}/subnets`;
    return this.client.request<Subnet[]>('GET', path);
  }

  /**
   * Gets a subnet by its ID.
   *
   * @param networkId The ID of the network.
   * @param subnetId The ID of the subnet.
   * @returns A promise for a subnet.
   */
  get(networkId: string, subnetId: string) {
    const path = `/networks/${networkId}/subnets/${subnetId}`;

    return this.client.request<Subnet>('GET', path);
  }

  /**
   * Creates a new subnet in a network.
   *
   * @param networkId The ID of the network.
   * @param subnet The subnet configuration.
   * @returns A promise for the new subnet.
   */
  create(networkId: string, subnet: SubnetConfig) {
    const path = `/networks/${networkId}/subnets`;
    return this.client.request<Subnet>('POST', path, subnet);
  }

  /**
   * Finds a subnet by its name or ID.
   *
   * @param networkId The ID of the network.
   * @param search The name or ID of the subnet to search for.
   * @returns A promise for the subnet, or `undefined` if no subnet is found.
   */
  async find(networkId: string, search: string) {
    const lowerCaseSearch = search.toLowerCase();
    const subnets = await this.list(networkId);

    const found = subnets.find((subnet) => {
      const id = subnet.id.toLowerCase();
      const name = subnet.name?.toLowerCase();

      if (id.includes(lowerCaseSearch) || name?.includes(lowerCaseSearch)) {
        return subnet;
      }
    });

    if (found) {
      return found;
    }

    throw new Error(`Unable to find ${search}, zero matches`);
  }

  /**
   * Attaches a subnet to an instance.
   *
   * @param networkId The ID of the network.
   * @param subnetId The ID of the subnet.
   * @param route The route configuration.
   * @returns A promise for the new route.
   */
  attachToInstance(networkId: string, subnetId: string, route: CreateRoute) {
    const path = `/networks/${networkId}/subnets/${subnetId}/routes`;

    return this.client.request<Subnet>('POST', path, route);
  }

  /**
   * Detaches a subnet from an instance.
   *
   * @param networkId The ID of the network.
   * @param subnetId The ID of the subnet.
   * @returns A promise for the response.
   */
  detachFromInstance(networkId: string, subnetId: string) {
    const path = `/networks/${networkId}/subnets/${subnetId}/routes`;

    return this.client.request<SimpleResponse>('DELETE', path);
  }

  /**
   * Deletes a subnet.
   *
   * @param networkId The ID of the network.
   * @param subnetId The ID of the subnet.
   * @returns A promise for the response.
   */
  destroy(networkId: string, subnetId: string) {
    const path = `/networks/${networkId}/subnets/${subnetId}/routes`;

    return this.client.request<SimpleResponse>('DELETE', path);
  }
}
