import type {
  CreateKfClusterReq,
  KfCluster,
  PaginatedResponse,
  SimpleResponse,
  UpdateKfClusterReq,
} from '../types';
import BaseResource from './base';

export class KfClustersResource extends BaseResource {
  list() {
    const path = '/kfclusters';
    return this.client.request<PaginatedResponse<KfCluster>>('GET', path);
  }

  get(id: string) {
    const path = `/kfclusters/${id}`;
    return this.client.request<KfCluster>('GET', path);
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

  create(data: CreateKfClusterReq) {
    const path = '/kfclusters';
    return this.client.request<KfCluster>('POST', path, {
      ...data,
      region: this.client.regionCode,
    });
  }

  update(id: string, data: UpdateKfClusterReq) {
    const path = `/kfclusters/${id}`;
    return this.client.request<KfCluster>('PUT', path, {
      ...data,
      region: this.client.regionCode,
    });
  }

  destroy(id: string) {
    const path = `/kfclusters/${id}`;
    return this.client.request<SimpleResponse>('DELETE', path);
  }
}
