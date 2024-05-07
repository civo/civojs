import type {
  LoadBalancer,
  LoadBalancerConfig,
  LoadBalancerUpdateConfig,
  SimpleResponse,
} from '../types';
import BaseResource from './base';

export class LoadBalancerResource extends BaseResource {
  list() {
    const path = '/loadbalancers';
    return this.client.request<LoadBalancer[]>('GET', path);
  }

  get(id: string) {
    const path = `/loadbalancers/${id}`;
    return this.client.request('GET', path);
  }

  async find(search: string) {
    const lowerCaseSearch = search.toLowerCase();
    const items = await this.list();

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

  create(data: LoadBalancerConfig) {
    const path = '/loadbalancers';
    return this.client.request<LoadBalancer>('POST', path, data);
  }

  update(id: string, data: LoadBalancerUpdateConfig) {
    const path = `/loadbalancers/${id}`;
    return this.client.request<LoadBalancer>('PUT', path, data);
  }

  destroy(id: string) {
    const path = `/loadbalancers/${id}`;
    return this.client.request<SimpleResponse>('DELETE', path);
  }
}
