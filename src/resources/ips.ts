import type {
  CreateIPRequest,
  IP,
  PaginatedResponse,
  SimpleResponse,
  UpdateIPRequest,
} from '../types';
import BaseResource from './base';

export class IpsResource extends BaseResource {
  list() {
    const path = '/ips';
    return this.client.request<PaginatedResponse<IP>>('GET', path);
  }

  get(id: string) {
    const path = `/ips/${id}`;
    return this.client.request<IP>('GET', path);
  }

  async find(search: string) {
    const lowerCaseSearch = search.toLowerCase();
    const { items } = await this.list();

    const found = items.find((item) => {
      const id = item.id.toLowerCase();
      const name = item.name?.toLowerCase();
      const ip = item.ip?.toLowerCase();

      if (
        id.search(lowerCaseSearch) ||
        name?.search(lowerCaseSearch) ||
        ip?.search(lowerCaseSearch)
      ) {
        return item;
      }
    });

    if (found) {
      return found;
    }

    throw new Error(`Unable to find ${search}, zero matches`);
  }

  create(data: CreateIPRequest) {
    const path = '/ips';
    return this.client.request<IP>('GET', path, data);
  }

  update(id: string, data: UpdateIPRequest) {
    const path = `/ips/${id}`;
    return this.client.request<IP>('PUT', path, data);
  }

  assign(
    id: string,
    resourceId: string,
    resourceType: string,
    region?: string,
  ) {
    const path = `/ips/${id}/actions`;
    return this.client.request<SimpleResponse>('POST', path, {
      action: 'assign',
      region: region ?? this.client.regionCode,
      assign_to_id: resourceId,
      assign_to_type: resourceType,
    });
  }

  unassign(id: string, region?: string) {
    const path = `/ips/${id}/actions`;
    return this.client.request<SimpleResponse>('POST', path, {
      action: 'unassign',
      region: region ?? this.client.regionCode,
    });
  }

  destroy(id: string) {
    const path = `/ips/${id}`;
    return this.client.request<SimpleResponse>('DELETE', path);
  }
}
