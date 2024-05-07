import type { Region } from '../types';
import BaseResource from './base';

export class RegionsResource extends BaseResource {
  /**
   * List all regions.
   *
   * @returns A list of regions.
   */
  list() {
    const path = '/regions';
    return this.client.request<Region[]>('GET', path);
  }

  /**
   * Find a region by search term.
   *
   * @param search The search term.
   *
   * @returns The found region, or an error if no region is found.
   */
  async find(search: string) {
    const lowerCaseSearch = search.toLowerCase();
    const regions = await this.list();

    const found = regions.find((region) => {
      const name = region.name.toLowerCase();
      const code = region.code.toLowerCase();

      if (name.search(lowerCaseSearch) || code.search(lowerCaseSearch)) {
        return region;
      }
    });

    if (found) {
      return found;
    }

    throw new Error(`Unable to find ${search}, zero matches`);
  }

  /**
   * Get the default region.
   *
   * @returns The default region, or an error if no default region is found.
   */
  async getDefault() {
    const regions = await this.list();
    const found = regions.find((region) => region.default);

    if (found) {
      return found;
    }

    throw new Error('No default region found');
  }
}
