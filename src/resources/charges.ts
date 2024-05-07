import type { Charge } from '../types';
import BaseResource from './base';

export class ChargeResource extends BaseResource {
  list(from: string | Date, to: string | Date) {
    const path = '/charges';
    return this.client.request<Charge[]>('GET', path, undefined, { from, to });
  }
}
