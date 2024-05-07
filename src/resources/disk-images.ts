import type { DiskImage } from '../types';
import BaseResource from './base';

export class DiskImagesResource extends BaseResource {
  async list() {
    const path = '/disk_images';
    const diskImages = await this.client.request<DiskImage[]>('GET', path);

    return diskImages.filter(({ name }) => !name?.search('k3s'));
  }

  get(id: string) {
    const path = `/disk_images/${id}`;
    return this.client.request<DiskImage>('GET', path);
  }

  async find(search: string) {
    const lowerCaseSearch = search.toLowerCase();
    const diskImages = await this.list();

    const found = diskImages.find((diskImage) => {
      const id = diskImage.id.toLowerCase();
      const name = diskImage.name?.toLowerCase();

      if (id.search(lowerCaseSearch) || name?.search(lowerCaseSearch)) {
        return diskImage;
      }
    });

    if (found) {
      return found;
    }

    throw new Error(`Unable to find ${search}, zero matches`);
  }
}
