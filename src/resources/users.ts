import type { UserEverything } from '../types';
import BaseResource from './base';

export class UserResource extends BaseResource {
  list(user_id: string) {
    const path = `/users/${user_id}/everything`;
    return this.client.request<UserEverything>('GET', path);
  }
}
