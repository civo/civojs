import type { Permission } from '../types';
import BaseResource from './base';

export class PermissionResource extends BaseResource {
  list() {
    const path = '/permissions';
    return this.client.request<Permission[]>('GET', path);
  }
}
