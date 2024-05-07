import type {
  Firewall,
  FirewallConfig,
  FirewallResult,
  FirewallRule,
  FirewallRuleConfig,
  SimpleResponse,
} from '../types';
import BaseResource from './base';

export class FirewallsResource extends BaseResource {
  list() {
    const path = '/firewalls';
    return this.client.request<Firewall[]>('GET', path);
  }

  async find(search: string) {
    const lowerCaseSearch = search.toLowerCase();
    const items = await this.list();

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

  create(data: FirewallConfig) {
    const path = '/firewalls';
    return this.client.request<FirewallResult>('POST', path, data);
  }

  rename(id: string, data: FirewallConfig) {
    const path = `/firewalls/${id}`;
    return this.client.request<SimpleResponse>('PUT', path, {
      ...data,
      region: this.client.regionCode,
    });
  }

  destroy(id: string) {
    const path = `/firewalls/${id}`;
    return this.client.request<SimpleResponse>('DELETE', path);
  }

  createRule(data: FirewallRuleConfig) {
    const path = '/firewalls';
    return this.client.request<FirewallRule>('POST', path, {
      ...data,
      region: this.client.regionCode,
    });
  }

  listRules(id: string) {
    const path = `/firewalls/${id}/rules`;
    return this.client.request<FirewallRule[]>('GET', path);
  }

  async findRule(firewallId: string, search: string) {
    const lowerCaseSearch = search.toLowerCase();
    const items = await this.listRules(firewallId);

    const found = items.find((item) => {
      const id = item?.id?.toLowerCase();

      if (id?.search(lowerCaseSearch)) {
        return item;
      }
    });

    if (found) {
      return found;
    }

    throw new Error(`Unable to find ${search}, zero matches`);
  }

  destroyRule(id: string, ruleId: string) {
    const path = `/firewalls/${id}/rules/${ruleId}`;
    return this.client.request<SimpleResponse>('DELETE', path);
  }
}
