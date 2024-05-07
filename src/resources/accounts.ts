import type { Account, PaginatedResponse } from '../types';
import BaseResource from './base';

export class AccountResouce extends BaseResource {
  list() {
    const path = '/accounts';
    return this.client.request<PaginatedResponse<Account>>('GET', path);
  }

  async get() {
    const accounts = await this.list();

    return accounts.items[0].id;
  }
}
