import type { SSHKey, SimpleResponse } from '../types';
import BaseResource from './base';

export class SSHKeyResource extends BaseResource {
  list() {
    const path = '/sshkeys';
    return this.client.request<SSHKey[]>('GET', path);
  }

  create(name: string, public_key: string) {
    const path = '/sshkeys';
    return this.client.request<SimpleResponse>('POST', path, {
      name,
      public_key,
    });
  }

  update(name: string, sshKeyId: string) {
    const path = `/sshkeys/${sshKeyId}`;
    return this.client.request<SimpleResponse>('PUT', path, { name });
  }

  async find(search: string) {
    const lowerCaseSearch = search.toLowerCase();
    const items = await this.list();

    const found = items.find((item) => {
      const id = item.id.toLowerCase();
      const name = item.name.toLowerCase();

      if (id.search(lowerCaseSearch) || name.search(lowerCaseSearch)) {
        return item;
      }
    });

    if (found) {
      return found;
    }

    throw new Error(`Unable to find ${search}, zero matches`);
  }

  destroy(id: string) {
    const path = `/sshkeys/${id}`;
    return this.client.request<SimpleResponse>('DELETE', path);
  }
}
