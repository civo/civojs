import type { ActionListRequest } from '../types';
import BaseResource from './base';

export class ActionResource extends BaseResource {
  list(listRequest: ActionListRequest) {
    const searchParams = new URLSearchParams();
    for (const property in listRequest) {
      searchParams.set(
        property,
        String(listRequest[property as keyof typeof listRequest]),
      );
    }
    const path = '/actions';

    return this.client.request('GET', path, undefined, listRequest);
  }
}
