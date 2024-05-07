import type { Quota } from '../types';
import BaseResource from './base';

export class QuotaResource extends BaseResource {
  get() {
    const path = '/quota';
    this.client.request<Quota>('GET', path);
  }
}
