import type {
  Instance,
  InstanceConfig,
  PaginatedResponse,
  SimpleResponse,
} from '../types';
import { randomName } from '../utils';
import BaseResource from './base';
import { DiskImagesResource } from './disk-images';
import { NetworksResource } from './networks';

export class InstancesResource extends BaseResource {
  list(page = 1, perPage = 15) {
    const path = '/instances';
    return this.client.request<PaginatedResponse<Instance>>(
      'GET',
      path,
      undefined,
      {
        page,
        per_page: perPage,
      },
    );
  }

  async find(search: string) {
    const lowerCaseSearch = search.toLowerCase();
    const instances = await this.list();

    const found = instances.items.find((instance) => {
      const id = instance.id.toLowerCase();
      const hostname = instance.hostname?.toLowerCase();

      if (id.search(lowerCaseSearch) || hostname?.search(lowerCaseSearch)) {
        return instance;
      }
    });

    if (found) {
      return found;
    }

    throw new Error(`Unable to find ${search}, zero matches`);
  }

  get(id: string) {
    const path = `/instances/${id}`;
    return this.client.request<Instance>('GET', path);
  }

  async createConfig(): Promise<InstanceConfig> {
    const networksResource = new NetworksResource(this.client);
    const networks = await networksResource.list();
    const defaultNetwork = networks.find((network) => network.default);
    if (!defaultNetwork) throw new Error('Network not found');

    const diskImagesResource = new DiskImagesResource(this.client);
    const diskImages = await diskImagesResource.list();
    const filteredDiskImages = diskImages.filter(
      ({ name }) => !name?.search('k3s'),
    );
    const diskImage = filteredDiskImages.find(
      ({ name }) => name === 'ubuntu-focal',
    );
    if (!diskImage) throw new Error('Disk image not found');

    return {
      count: 1,
      hostname: randomName(),
      reverse_dns: '',
      size: 'g3.medium',
      region: this.client.regionCode,
      public_ip: 'true',
      network_id: defaultNetwork.id,
      template_id: diskImage.id,
      snapshot_id: '',
      initial_user: 'civo',
      ssh_key_id: '',
      script: '',
      tags: [],
      firewall_id: '',
    };
  }

  create(data: InstanceConfig) {
    const path = '/instances';
    return this.client.request<Instance>('POST', path, data);
  }

  setTags(instance: Instance, tags: string) {
    const path = `/instances/${instance.id}/tags`;
    return this.client.request<SimpleResponse>('PUT', path, {
      tags,
      region: this.client.regionCode,
    });
  }

  update(instance: Instance) {
    const path = `/instances/${instance.id}`;
    const body = {
      hostname: instance.hostname,
      reverse_dns: instance.reverse_dns,
      notes: instance.notes,
      region: this.client.regionCode,
      public_ip: instance.public_ip,
      subnets: instance.subnets,
    };

    if (!instance.notes) {
      // @ts-expect-error extra key
      body.notes_delete = 'true';
    }

    return this.client.request<SimpleResponse>('PUT', path, body);
  }

  destroy(id: string) {
    const path = `/instances/${id}`;
    return this.client.request<SimpleResponse>('DELETE', path);
  }

  hardReboot(id: string) {
    const path = `/instances/${id}/hard_reboots`;
    return this.client.request<SimpleResponse>('POST', path, {
      region: this.client.regionCode,
    });
  }

  softReboot(id: string) {
    const path = `/instances/${id}/soft_reboots`;
    return this.client.request<SimpleResponse>('POST', path, {
      region: this.client.regionCode,
    });
  }

  stop(id: string) {
    const path = `/instances/${id}/stop`;
    return this.client.request<SimpleResponse>('PUT', path, {
      region: this.client.regionCode,
    });
  }

  start(id: string) {
    const path = `/instances/${id}/start`;
    return this.client.request<SimpleResponse>('PUT', path, {
      region: this.client.regionCode,
    });
  }

  getConsoleURL(id: string) {
    const path = `/instances/${id}/console`;
    return this.client.request<string>('GET', path);
  }

  upgrade(id: string, newSize: string) {
    const path = `/instances/${id}/resize`;
    return this.client.request<SimpleResponse>('PUT', path, {
      size: newSize,
      region: this.client.regionCode,
    });
  }

  movePublicIPToInstance(id: string, ipAddress: string) {
    const path = `/instances/${id}/ip/${ipAddress}`;
    return this.client.request<SimpleResponse>('PUT', path);
  }

  setInstanceFirewall(id: string, firewallId: string) {
    const path = `/instances/${id}/ip/${firewallId}`;
    return this.client.request<SimpleResponse>('PUT', path, {
      firewall_id: firewallId,
      region: this.client.regionCode,
    });
  }
}
