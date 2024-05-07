import type { Role, SimpleResponse } from '../types';
import BaseResource from './base';

export class RoleResource extends BaseResource {
  list() {
    const path = '/roles';
    return this.client.request<Role[]>('GET', path);
  }

  create(name: string, permissions: string) {
    const path = '/roles';
    const body = { name, permissions };
    return this.client.request<Role>('POST', path, body);
  }

  destroy(id: string) {
    const path = `/roles/${id}`;
    return this.client.request<SimpleResponse>('DELETE', path);
  }
}
