import type { Account, Organization } from '../types';
import BaseResource from './base';

export class OrganizationResource extends BaseResource {
  get() {
    const path = '/organization';
    return this.client.request<Organization>('GET', path);
  }

  create(name: string) {
    const path = '/organization';
    const body = { name };
    return this.client.request<Organization>('POST', path, body);
  }

  rename(name: string) {
    const path = '/organization';
    const body = { name };
    return this.client.request<Organization>('PUT', path, body);
  }

  addAccount(organization_id: string, organization_token: string) {
    const path = '/organization/accounts';
    const body = { organization_id, organization_token };
    return this.client.request<Account[]>('POST', path, body);
  }

  listAccounts() {
    const path = '/organization/accounts';
    return this.client.request<Account[]>('GET', path);
  }
}
