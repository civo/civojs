import type {
  Application,
  ApplicationConfig,
  PaginatedResponse,
  SimpleResponse,
  UpdateApplicationRequest,
} from '../types';
import { randomName } from '../utils';
import BaseResource from './base';
import { NetworksResource } from './networks';

export class ApplicationResource extends BaseResource {
  list() {
    const path = '/applications';
    return this.client.request<PaginatedResponse<Application>>('GET', path);
  }

  get(id: string) {
    const path = `/applications/${id}`;

    return this.client.request<Application>('GET', path);
  }

  getLogAuth(id: string) {
    const path = `/applications/${id}/log_auth`;

    return this.client.request<string>('GET', path);
  }

  async createConfig() {
    const network = new NetworksResource(this.client);
    const defaultNetwork = await network.getDefault();

    return {
      name: randomName(),
      network_id: defaultNetwork.id,
      description: '',
      size: 'small',
      ssh_key_ids: [],
    } satisfies ApplicationConfig;
  }

  async find(search: string) {
    const lowerCaseSearch = search.toLowerCase();
    const { items } = await this.list();

    const found = items.find((item) => {
      const id = item.id.toLowerCase();
      const name = item.name?.toLowerCase();

      if (id.search(lowerCaseSearch) || name?.search(lowerCaseSearch)) {
        return item;
      }
    });

    if (found) {
      return found;
    }

    throw new Error(`Unable to find ${search}, zero matches`);
  }

  create(data: ApplicationConfig) {
    const path = '/applications';
    return this.client.request<Application>('POST', path, data);
  }

  update(id: string, data: UpdateApplicationRequest) {
    const path = `/applications/${id}`;
    return this.client.request<Application>('PUT', path, data);
  }

  destroy(id: string) {
    const path = `/applications/${id}`;
    return this.client.request<SimpleResponse>('DELETE', path);
  }
}
