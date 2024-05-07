import type { SimpleResponse, Webhook, WebhookConfig } from '../types';
import BaseResource from './base';

export class WebhookResource extends BaseResource {
  list() {
    const path = '/webhooks';
    return this.client.request<Webhook[]>('GET', path);
  }

  async find(search: string) {
    const lowerCaseSearch = search.toLowerCase();
    const items = await this.list();

    const found = items.find((item) => {
      const id = item.id.toLowerCase();
      const url = item.url?.toLowerCase();

      if (id.search(lowerCaseSearch) || url?.search(lowerCaseSearch)) {
        return item;
      }
    });

    if (found) {
      return found;
    }

    throw new Error(`Unable to find ${search}, zero matches`);
  }

  create(data: WebhookConfig) {
    const path = '/webhooks';
    return this.client.request<Webhook>('POST', path, data);
  }

  update(id: string, data: WebhookConfig) {
    const path = `/webhooks/${id}`;
    return this.client.request<Webhook>('PUT', path, data);
  }

  destroy(id: string) {
    const path = `/webhooks/${id}`;
    return this.client.request<SimpleResponse>('DELETE', path);
  }
}
