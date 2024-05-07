import type {
  Instance,
  KubernetesCluster,
  KubernetesClusterConfig,
  KubernetesClusterPoolConfig,
  KubernetesMarketplaceApplication,
  KubernetesVersion,
  PaginatedResponse,
  SimpleResponse,
} from '../types';
import BaseResource from './base';

export class KubernetesResource extends BaseResource {
  /**
   * Lists all Kubernetes clusters.
   *
   * @returns A paginated list of Kubernetes clusters.
   */
  listClusters() {
    const path = '/kubernetes/clusters';
    return this.client.request<PaginatedResponse<KubernetesCluster>>(
      'GET',
      path,
    );
  }

  /**
   * Finds a Kubernetes cluster by search term.
   *
   * @param search The search term.
   * @returns The Kubernetes cluster, or undefined if not found.
   */
  async findKubernetesCluster(search: string) {
    const lowerCaseSearch = search.toLowerCase();
    const clusters = await this.listClusters();

    const found = clusters.items.find((cluster) => {
      const id = cluster.id.toLowerCase();
      const name = cluster.name?.toLowerCase();

      if (id.search(lowerCaseSearch) || name?.search(lowerCaseSearch)) {
        return cluster;
      }
    });

    if (found) {
      return found;
    }

    throw new Error(`Unable to find ${search}, zero matches`);
  }

  /**
   * Creates a new Kubernetes cluster.
   *
   * @param data The Kubernetes cluster configuration.
   * @returns The newly created Kubernetes cluster.
   */
  createCluster(data: KubernetesClusterConfig) {
    const path = '/kubernetes/clusters';
    return this.client.request<KubernetesCluster>('POST', path, {
      ...data,
      region: this.client.regionCode,
    });
  }

  /**
   * Gets the details of a Kubernetes cluster.
   *
   * @param id The ID of the Kubernetes cluster.
   * @returns The Kubernetes cluster.
   */
  getCluster(id: string) {
    const path = `/kubernetes/clusters/${id}`;
    return this.client.request<KubernetesCluster>('GET', path);
  }

  /**
   * Updates a Kubernetes cluster.
   *
   * @param id The ID of the Kubernetes cluster.
   * @param data The Kubernetes cluster configuration.
   * @returns The updated Kubernetes cluster.
   */
  updateCluster(id: string, data: KubernetesClusterConfig) {
    const path = `/kubernetes/clusters/${id}`;
    return this.client.request<KubernetesCluster>('PUT', path, {
      ...data,
      region: this.client.regionCode,
    });
  }

  /**
   * Creates a new Kubernetes cluster pool.
   *
   * @param id The ID of the Kubernetes cluster.
   * @param data The Kubernetes cluster pool configuration.
   * @returns The newly created Kubernetes cluster pool.
   */
  createPool(id: string, data: KubernetesClusterPoolConfig) {
    const path = `/kubernetes/clusters/${id}/pools`;
    return this.client.request<KubernetesCluster>('POST', path, {
      ...data,
      region: this.client.regionCode,
    });
  }

  /**
   * Lists all Kubernetes Marketplace applications.
   *
   * @returns A paginated list of Kubernetes Marketplace applications.
   */
  listMarketplaceApplications() {
    const path = '/kubernetes/applications';
    return this.client.request<KubernetesMarketplaceApplication>('GET', path);
  }

  /**
   * Destroys a Kubernetes cluster.
   *
   * @param id The ID of the Kubernetes cluster.
   * @returns A promise that resolves when the Kubernetes cluster has been destroyed.
   */
  destroyCluster(id: string) {
    const path = `/kubernetes/clusters/${id}`;
    return this.client.request<SimpleResponse>('DELETE', path);
  }

  /**
   * Recycles a Kubernetes cluster. This will restart all of the cluster's nodes,
   * which can be useful for troubleshooting or fixing problems with the cluster.
   *
   * @param id The ID of the Kubernetes cluster.
   * @param hostname The hostname of the Kubernetes cluster.
   * @returns A promise that resolves when the Kubernetes cluster has been recycled.
   */
  recycleCluster(id: string, hostname: string) {
    const path = `/kubernetes/clusters/${id}/recycle`;
    return this.client.request<SimpleResponse>('POST', path, {
      hostname,
      region: this.client.regionCode,
    });
  }

  /**
   * Lists all available Kubernetes versions.
   *
   * @returns A promise that resolves to an array of Kubernetes versions.
   */
  listAvailableVersions() {
    const path = '/kubernetes/versions';
    return this.client.request<KubernetesVersion>('GET', path);
  }

  /**
   * Lists all of the instances in a Kubernetes cluster.
   *
   * @param id The ID of the Kubernetes cluster.
   * @returns A promise that resolves to an array of Kubernetes cluster instances.
   */
  listClusterInstances(id: string) {
    const path = `/kubernetes/clusters/${id}/instances`;
    return this.client.request<Instance[]>('GET', path);
  }

  /**
   * Finds a Kubernetes cluster instance by ID and search term.
   *
   * @param id The ID of the Kubernetes cluster.
   * @param search The search term.
   * @returns A promise that resolves to the Kubernetes cluster instance, or undefined if not found.
   */
  async findClusterInstance(id: string, search: string) {
    const lowerCaseSearch = search.toLowerCase();
    const instances = await this.listClusterInstances(id);

    const found = instances.find((instance) => {
      const id = instance.id.toLowerCase();
      const hostname = instance.hostname?.toLowerCase();

      if (id.includes(lowerCaseSearch) || hostname?.includes(lowerCaseSearch)) {
        return instance;
      }
    });

    if (found) {
      return found;
    }

    throw new Error(`Unable to find ${search}, zero matches`);
  }
}
