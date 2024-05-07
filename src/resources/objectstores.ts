import type {
  CreateObjectStoreRequest,
  ObjectStore,
  PaginatedResponse,
  SimpleResponse,
  UpdateObjectStoreRequest,
} from '../types';
import BaseResource from './base';

export class ObjectStoreResource extends BaseResource {
  list() {
    const path = '/objectstores';
    return this.client.request<PaginatedResponse<ObjectStore>>('GET', path);
  }

  get(id: string) {
    const path = `/objectstores/${id}`;
    return this.client.request<ObjectStore>('GET', path);
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

  create(data: CreateObjectStoreRequest) {
    const path = '/objectstores';
    return this.client.request<ObjectStore>('POST', path, data);
  }

  update(id: string, data: UpdateObjectStoreRequest) {
    const path = `/objectstores/${id}`;
    return this.client.request<ObjectStore>('PUT', path, data);
  }

  destroy(id: string) {
    const path = `/objectstores/${id}`;
    return this.client.request<SimpleResponse>('DELETE', path);
  }
}
