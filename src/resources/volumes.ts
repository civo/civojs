import type {
  SimpleResponse,
  Volume,
  VolumeConfig,
  VolumeResult,
} from '../types';
import BaseResource from './base';
import { KubernetesResource } from './kubernetes';

export class VolumeResource extends BaseResource {
  list() {
    const path = '/volumes';
    return this.client.request<Volume[]>('GET', path);
  }

  async listClusterVolumes(clusterId: string) {
    const kubernetes = new KubernetesResource(this.client);
    const cluster = await kubernetes.findKubernetesCluster(clusterId);

    const volumes = await this.list();

    const clusterVolumes = volumes.filter(
      ({ cluster_id }) => cluster_id === cluster.id,
    );

    return clusterVolumes;
  }

  async listDanglingVolumes() {
    const kubernetes = new KubernetesResource(this.client);

    const volumes = await this.list();
    const clusters = await kubernetes.listClusters();
    const clustersIds = clusters.items.map(({ id }) => id);

    return volumes.filter(({ cluster_id }) => clustersIds.includes(cluster_id));
  }

  get(id: string) {
    const path = `/volumes/${id}`;
    return this.client.request<Volume>('GET', path);
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

  create(data: VolumeConfig) {
    const path = '/volumes';
    return this.client.request<VolumeResult>('POST', path, data);
  }

  resize(id: string, size: number) {
    const path = `/volumes/${id}/resize`;
    return this.client.request<SimpleResponse>('PUT', path, {
      size_gb: size,
      region: this.client.regionCode,
    });
  }

  attach(id: string, instance_id: string) {
    const path = `/volumes/${id}/attach`;
    return this.client.request<SimpleResponse>('PUT', path, {
      instance_id,
      region: this.client.regionCode,
    });
  }

  detach(id: string) {
    const path = `/volumes/${id}/detach`;
    return this.client.request<SimpleResponse>('PUT', path, {
      region: this.client.regionCode,
    });
  }

  destroy(id: string) {
    const path = `/volumes/${id}`;
    return this.client.request<SimpleResponse>('DELETE', path);
  }
}
