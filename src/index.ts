import CivoError from './error';
import Client, { type Config } from './request';
import { AccountResouce } from './resources/accounts';
import { ActionResource } from './resources/actions';
import { ApplicationResource } from './resources/applications';
import { ChargeResource } from './resources/charges';
import {
  DatabaseBackupResource,
  DatabaseResource,
} from './resources/databases';
import { DiskImagesResource } from './resources/disk-images';
import { DNSDomainResource } from './resources/dns';
import { FirewallsResource } from './resources/firewalls';
import { InstancesResource } from './resources/instances';
import { IpsResource } from './resources/ips';
import { KfClustersResource } from './resources/kfclusters';
import { KubernetesResource } from './resources/kubernetes';
import { LoadBalancerResource } from './resources/loadbalancers';
import { NetworksResource, SubnetsResource } from './resources/networks';
import { ObjectStoreResource } from './resources/objectstores';
import { OrganizationResource } from './resources/organizations';
import { PermissionResource } from './resources/permissions';
import { PoolResource } from './resources/pools';
import { QuotaResource } from './resources/quota';
import { RegionsResource } from './resources/regions';
import { RoleResource } from './resources/roles';
import { SSHKeyResource } from './resources/ssh-keys';
import { TeamResource } from './resources/teams';
import { UserResource } from './resources/users';
import { VolumeResource } from './resources/volumes';
import { WebhookResource } from './resources/webhooks';

/**
 * A comprehensive Resource client for the Civo cloud platform.
 */
class Civo {
  public client: Client;

  public accounts: AccountResouce;
  public actions: ActionResource;
  public applications: ApplicationResource;
  public charges: ChargeResource;
  public databases: DatabaseResource;
  public databaseBackups: DatabaseBackupResource;
  public diskImages: DiskImagesResource;
  public dns: DNSDomainResource;
  public firewalls: FirewallsResource;
  public instances: InstancesResource;
  public ips: IpsResource;
  public kfclusters: KfClustersResource;
  public kubernetes: KubernetesResource;
  public loadbalancers: LoadBalancerResource;
  public networks: NetworksResource;
  public subnets: SubnetsResource;
  public objectStore: ObjectStoreResource;
  public organizations: OrganizationResource;
  public permissions: PermissionResource;
  public pools: PoolResource;
  public quotas: QuotaResource;
  public regions: RegionsResource;
  public roles: RoleResource;
  public sshKeys: SSHKeyResource;
  public teams: TeamResource;
  public users: UserResource;
  public volumes: VolumeResource;
  public webhooks: WebhookResource;
  public errors: CivoError;

  /**
   * Creates a new Civo Resource client.
   *
   * @param config The Civo Resource key and other configuration options.
   */
  constructor(config: Config) {
    this.client = new Client(config);
    this.errors = new CivoError();

    this.accounts = new AccountResouce(this.client);
    this.actions = new ActionResource(this.client);
    this.applications = new ApplicationResource(this.client);
    this.charges = new ChargeResource(this.client);
    this.databases = new DatabaseResource(this.client);
    this.databaseBackups = new DatabaseBackupResource(this.client);
    this.diskImages = new DiskImagesResource(this.client);
    this.dns = new DNSDomainResource(this.client);
    this.firewalls = new FirewallsResource(this.client);
    this.instances = new InstancesResource(this.client);
    this.ips = new IpsResource(this.client);
    this.kfclusters = new KfClustersResource(this.client);
    this.kubernetes = new KubernetesResource(this.client);
    this.loadbalancers = new LoadBalancerResource(this.client);
    this.networks = new NetworksResource(this.client);
    this.subnets = new SubnetsResource(this.client);
    this.objectStore = new ObjectStoreResource(this.client);
    this.organizations = new OrganizationResource(this.client);
    this.permissions = new PermissionResource(this.client);
    this.pools = new PoolResource(this.client);
    this.quotas = new QuotaResource(this.client);
    this.regions = new RegionsResource(this.client);
    this.roles = new RoleResource(this.client);
    this.sshKeys = new SSHKeyResource(this.client);
    this.teams = new TeamResource(this.client);
    this.users = new UserResource(this.client);
    this.volumes = new VolumeResource(this.client);
    this.webhooks = new WebhookResource(this.client);
  }
}

export {
  Civo,
  CivoError,
  Client,
  type Config,
  AccountResouce,
  ActionResource,
  ApplicationResource,
  NetworksResource,
  SubnetsResource,
  ChargeResource,
  DatabaseResource,
  DatabaseBackupResource,
  DiskImagesResource,
  DNSDomainResource,
  FirewallsResource,
  InstancesResource,
  IpsResource,
  KfClustersResource,
  KubernetesResource,
  LoadBalancerResource,
  ObjectStoreResource,
  OrganizationResource,
  PermissionResource,
  PoolResource,
  QuotaResource,
  RegionsResource,
  RoleResource,
  SSHKeyResource,
  TeamResource,
  UserResource,
  VolumeResource,
  WebhookResource,
};
export * from './types';
