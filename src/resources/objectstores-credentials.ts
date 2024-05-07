import type {
  CreateObjectStoreCredentialRequest,
  ObjectStoreCredential,
  PaginatedResponse,
  SimpleResponse,
  UpdateObjectStoreCredentialRequest,
} from '../types';
import BaseResource from './base';

export class ObjectStoreCredentialsResource extends BaseResource {
  list() {
    const path = '/objectstore/credentials';
    return this.client.request<PaginatedResponse<ObjectStoreCredential>>(
      'GET',
      path,
    );
  }

  get(id: string) {
    const path = `/objectstore/credentials/${id}`;
    return this.client.request<ObjectStoreCredential>('GET', path);
  }

  async find(search: string) {
    const lowerCaseSearch = search.toLowerCase();
    const { items } = await this.list();

    const found = items.find((item) => {
      const id = item.id.toLowerCase();
      const name = item.name?.toLowerCase();
      const accessKeyId = item.access_key_id?.toLowerCase();

      if (
        id.search(lowerCaseSearch) ||
        name?.search(lowerCaseSearch) ||
        accessKeyId.search(lowerCaseSearch)
      ) {
        return item;
      }
    });

    if (found) {
      return found;
    }

    throw new Error(`Unable to find ${search}, zero matches`);
  }

  create(data: CreateObjectStoreCredentialRequest) {
    const path = '/objectstore/credentials';
    return this.client.request<ObjectStoreCredential>('POST', path, data);
  }

  update(id: string, data: UpdateObjectStoreCredentialRequest) {
    const path = `/objectstore/credentials/${id}`;
    return this.client.request<ObjectStoreCredential>('PUT', path, data);
  }

  destroy(id: string) {
    const path = `/objectstore/credentials/${id}`;
    return this.client.request<SimpleResponse>('DELETE', path);
  }
}
