import { z } from 'zod';

export type Account = {
  id: string;
  label?: string;
  email_address?: string;
  api_key?: string;
  token?: string;
  flags?: string;
  timezone?: string;
  partner?: string;
  default_user_id?: string;
  status?: string;
  email_confirmed?: boolean;
  credit_card_added?: boolean;
  enabled?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type PaginatedResponse<T extends Record<string, unknown>> = {
  page: number;
  per_page: number;
  pages: number;
  items: Array<T>;
};

export type ActionListRequest = {
  page?: number;
  per_page?: number;
  user_id?: string;
  include_debug?: boolean;
  resource_id?: string;
  details?: string;
  related_id?: string;
  resource_type?: string;
  action_type?: string;
  created_at?: string;
  updated_at?: string;
};

export type EnvVar = {
  name: string;
  value: string;
};

export type ProcessInfo = {
  processType: string;
  processCount: number;
};

export type Application = {
  id: string;
  name: string;
  network_id: string;
  description: string;
  image: string;
  size: string;
  process_info?: Array<ProcessInfo>;
  domains?: Array<string>;
  ssh_key_ids?: Array<string>;
  config?: Array<EnvVar>;
  status: string;
};

export type ApplicationConfig = {
  name: string;
  network_id: string;
  description: string;
  size: string;
  ssh_key_ids?: Array<string>;
};

export type UpdateApplicationRequest = {
  name: string;
  advanced: boolean;
  image: string;
  description: string;
  process_info: ProcessInfo[];
  size: string;
  ssh_key_ids: Array<string>;
  config: EnvVar[];
  domains: Array<string>;
};

export type Network = {
  id: string;
  name?: string;
  default: boolean;
  cidr?: string;
  cidr_v6?: string;
  label?: string;
  status?: string;
  ipv4_enabled?: boolean;
  ipv6_enabled?: boolean;
  nameservers_v4?: Array<string>;
  nameservers_v6?: Array<string>;
};

// Subnet represents a subnet within a private network
export type Subnet = {
  id: string;
  name?: string;
  network_id: string;
  subnet_size?: string;
  status?: string;
};

// SubnetConfig contains incoming request parameters for the subnet object
export const SubnetConfigSchema = z.object({
  name: z.string(),
});

// Route represents a route within a subnet
export type Route = {
  id: string;
  subnet_id: string;
  network_id: string;
  resource_id: string;
  resource_type: string;
};

// CreateRoute contains incoming request parameters for creating a route object
export type CreateRoute = {
  resource_id: string;
  resource_type: string;
};

// NetworkConfig contains incoming request parameters for the network object
export type NetworkConfig = {
  label: string;
  default?: string;
  ipv4_enabled?: boolean;
  nameservers_v4?: Array<string>;
  cidr_v4?: string;
  ipv6_enabled?: boolean;
  nameservers_v6?: Array<string>;
  region: string;
};

// SubnetConfig contains incoming request parameters for the subnet object
export type SubnetConfig = {
  name: string;
};

// NetworkResult represents the result from a network create/update call
export type NetworkResult = {
  id: string;
  label: string;
  result: string;
};

export type SimpleResponse = {
  id: string;
  result: string;
  code: string;
  reason: string;
  details: string;
};

export type Taint = {
  /**
   * Required. The effect of the taint on pods that do not tolerate the taint. Valid effects are NoSchedule, PreferNoSchedule and NoExecute.
   */
  effect: string;
  /**
   * Required. The taint key to be applied to a node.
   */
  key: string;
  /**
   * TimeAdded represents the time at which the taint was added. It is only written for NoExecute taints.
   */
  timeAdded?: string;
  /**
   * The taint value corresponding to the taint key.
   */
  value?: string;
};

export type Charge = {
  code: string;
  label: string;
  from: string;
  to: string;
  num_hours: number;
  size_gb: number;
};

// Database holds the database information
export type Database = {
  id: string;
  name: string;
  nodes: number;
  size: string;
  software: string;
  software_version: string;
  public_ipv4: string;
  network_id: string;
  firewall_id: string;
  port: number;
  username: string;
  password: string;
  status: string;
};

// CreateDatabaseRequest holds fields required to creates a new database
export type CreateDatabaseRequest = {
  name: string;
  size: string;
  software: string;
  software_version: string;
  network_id: string;
  nodes: number;
  firewall_id: string;
  firewall_rule: string;
  region: string;
};

// UpdateDatabaseRequest holds fields required to update a database
export type UpdateDatabaseRequest = {
  name: string;
  nodes: number;
  firewall_id: string;
  region: string;
};

// SupportedSoftwareVersion contains the information related to a specific software version
export type SupportedSoftwareVersion = {
  software_version: string;
  default: boolean;
};

// RestoreDatabaseRequest is the request body for restoring a database
export type RestoreDatabaseRequest = {
  software: string;
  network_id: string;
  backup: string;
  region: string;
};

// DatabaseBackup represents a backup
export type DatabaseBackup = {
  name: string;
  database_name: string;
  database_id: string;
  software: string;
  schedule: string;
  count: number;
  backups: string[];
};

// DatabaseBackupCreateRequest represents a backup create request
export type DatabaseBackupCreateRequest = {
  name: string;
  schedule: string;
  count: number;
  region: string;
};

// DiskImage represents a DiskImage for launching instances from
export type DiskImage = {
  id: string;
  name?: string;
  version?: string;
  state?: string;
  distribution?: string;
  description?: string;
  label?: string;
};

// DNSDomain represents a domain registered within Civo's infrastructure
export type DNSDomain = {
  // The ID of the domain
  id: string;

  // The ID of the account
  account_id: string;

  // The Name of the domain
  name: string;
};

export type DNSDomainConfig = {
  name: string;
};

// DNSRecordType represents the allowed record types: a, cname, mx or txt
export type DNSRecordType = 'a' | 'cname' | 'mx' | 'txt';

// DNSRecord represents a DNS record registered within Civo's infrastructure
export type DNSRecord = {
  id: string;
  account_id?: string;
  domain_id?: string;
  name?: string;
  value?: string;
  type?: DNSRecordType;
  priority?: number;
  ttl?: number;
  created_at?: string;
  updated_at?: string;
};

// DNSRecordConfig describes the parameters for a new DNS record
// none of the fields are mandatory and will be automatically
// set with default values
export type DNSRecordConfig = {
  type: DNSRecordType;
  name: string;
  value: string;
  priority: number;
  ttl: string;
};

// DNSRecordTypeA represents an A record
export type DNSRecordTypeA = 'A';
// DNSRecordTypeCName represents an CNAME record
export type DNSRecordTypeCName = 'CNAME';
// DNSRecordTypeMX represents an MX record
export type DNSRecordTypeMX = 'MX';
// DNSRecordTypeSRV represents an SRV record
export type DNSRecordTypeSRV = 'SRV';
// DNSRecordTypeTXT represents an TXT record
export type DNSRecordTypeTXT = 'TXT';

// FirewallRule represents a single rule for a given firewall, regarding
// which ports to open and which protocol, to which CIDR
export type FirewallRule = {
  id?: string;
  firewall_id?: string;
  protocol: string;
  start_port: string;
  end_port: string;
  cidr: Array<string>;
  direction: string;
  action: string;
  label?: string;
  ports?: string;
};

// Firewall represents list of rule in Civo's infrastructure
export type Firewall = {
  id: string;
  name?: string;
  rules_count?: string;
  instance_count: number;
  cluster_count: number;
  loadbalancer_count: number;
  network_id?: string;
  rules?: FirewallRule[];
};

// FirewallResult is the response from the Civo Firewall APIs
export type FirewallResult = {
  id: string;
  name: string;
  result: string;
};

// FirewallRuleConfig is how you specify the details when creating a new rule
export type FirewallRuleConfig = {
  firewall_id: string;
  region: string;
  protocol: string;
  start_port: string;
  end_port: string;
  cidr: Array<string>;
  direction: string;
  action: string;
  label?: string;
  // Ports will be chosen over StartPort,EndPort if both are provided
  ports?: string;
};

// FirewallConfig is how you specify the details when creating a new firewall
export type FirewallConfig = {
  name: string;
  region: string;
  network_id: string;
  // CreateRules if not send the value will be nil, that mean the default rules will be created
  create_rules?: boolean;
  rules?: FirewallRule[];
};

// Instance represents a virtual server within Civo's infrastructure
export type Instance = {
  id: string;
  openstack_server_id: string;
  hostname: string;
  reverse_dns: string;
  size: string;
  region: string;
  network_id: string;
  private_ip: string;
  public_ip: string;
  ipv6: string;
  pseudo_ip: string;
  template_id: string;
  source_type: string;
  source_id: string;
  snapshot_id: string;
  initial_user: string;
  initial_password: string;
  ssh_key: string;
  ssh_key_id: string;
  status: string;
  notes: string;
  firewall_id: string;
  tags: Array<string>;
  civostatsd_token: string;
  civostatsd_stats: string;
  civostatsd_stats_per_minute: Array<string>;
  civostatsd_stats_per_hour: Array<string>;
  openstack_image_id: string;
  rescue_password: string;
  volume_backed: boolean;
  cpu_cores: number;
  ram_mb: number;
  disk_gb: number;
  gpu_count: number;
  gpu_type: string;
  script: string;
  created_at: string;
  reserved_ip_id: string;
  reserved_ip_name: string;
  reserved_ip: string;
  subnets: Subnet[];
};

// InstanceConsole represents a link to a webconsole for an instances
export type InstanceConsole = {
  url: string;
};

// InstanceConfig describes the parameters for a new instance
// none of the fields are mandatory and will be automatically
// set with default values
export type InstanceConfig = {
  count: number;
  hostname: string;
  reverse_dns: string;
  size: string;
  region: string;
  public_ip: string;
  network_id: string;
  template_id: string;
  source_type?: string;
  source_id?: string;
  snapshot_id: string;
  subnets?: Array<string>;
  initial_user: string;
  ssh_key_id: string;
  script: string;
  tags: Array<string>;
  firewall_id: string;
};

// AssignedTo represents IP assigned to resource
export type AssignedTo = {
  id: string;
  // Type can be one of the following:
  // - instance
  // - loadbalancer
  type: string;
  name: string;
};

// IP represents a serialized structure
export type IP = {
  id: string;
  name?: string;
  ip?: string;
  assigned_to?: AssignedTo;
};

// CreateIPRequest is a struct for creating an IP
export type CreateIPRequest = {
  // Name is an optional parameter. If not provided, name will be the IP address
  name?: string;

  // Region is the region the IP will be created in
  region: string;
};

// UpdateIPRequest is a struct for creating an IP
export type UpdateIPRequest = {
  name: string;
  // Region is the region the IP will be created in
  region: string;
};

// Actions for IP
export type Actions = {
  // Action is one of "assign", "unassign"
  action: 'assign' | 'unassign';
  assign_to_id?: string;
  assign_to_type?: string;
  // Region is the region the IP will be created in
  region: string;
};

// KfCluster represents a cluster with Kubeflow installed.
export type KfCluster = {
  id: string;
  name: string;
  network_id: string;
  firewall_id: string;
  size: string;
  kubeflow_ready: string;
  dashboard_url: string;
  created_at: string;
};

// CreateKfClusterReq is the request for creating a KfCluster.
export type CreateKfClusterReq = {
  name: string;
  network_id: string;
  firewall_id: string;
  size: string;
  region?: string;
};

// UpdateKfClusterReq is the request for updating a KfCluster.
export type UpdateKfClusterReq = {
  name: string;
  region?: string;
};

// KubernetesInstance represents a single node/master within a Kubernetes cluster
export type KubernetesInstance = {
  id: string;
  hostname?: string;
  size?: string;
  region?: string;
  source_type?: string;
  source_id?: string;
  initial_user?: string;
  initial_password?: string;
  status?: string;
  firewall_id?: string;
  public_ip?: string;
  cpu_cores?: number;
  ram_mb?: number;
  disk_gb?: number;
  tags?: Array<string>;
  created_at?: string;
  civostatsd_token?: string;
};

// KubernetesPool represents a single pool within a Kubernetes cluster
export type KubernetesPool = {
  id: string;
  count?: number;
  size?: string;
  instance_names?: Array<string>;
  instances?: KubernetesInstance[];
  labels?: Record<string, string>;
  taints?: Taint[];
  public_ip_node_pool?: boolean;
};

// KubernetesInstalledApplication is an application within our marketplace available for
// installation
export type KubernetesInstalledApplication = {
  application?: string;
  name?: string;
  version?: string;
  dependencies: Array<string>;
  maintainer?: string;
  description?: string;
  post_install?: string;
  installed?: boolean;
  url?: string;
  category?: string;
  updated_at?: string;
  image_url?: string;
  plan?: string;
  configuration?: Record<string, string>;
};

// Condition is a condition for a Kubernetes cluster
export type Condition = {
  type: string;
  status: string;
  synced: boolean;
  last_transition_time: string;
  reason?: string;
  message?: string;
};

// RequiredPools returns the required pools for a given Kubernetes cluster
export type RequiredPools = {
  id: string;
  size: string;
  count: number;
  labels?: Record<string, string>;
  taints?: Taint[] | null;
  public_ip_node_pool?: boolean;
};

// KubernetesCluster is a Kubernetes item inside the cluster
export type KubernetesCluster = {
  id: string;
  name?: string;
  generated_name?: string;
  version?: string;
  status?: string;
  ready?: boolean;
  cluster_type?: string;
  num_target_nodes?: number;
  target_nodes_size?: string;
  built_at?: string;
  kubeconfig?: string | null;
  kubernetes_version?: string;
  api_endpoint?: string;
  master_ip?: string;
  dns_entry?: string;
  upgrade_available_to?: string;
  legacy?: boolean;
  network_id?: string;
  namespace?: string;
  tags?: Array<string>;
  created_at?: string;
  instances?: KubernetesInstance[];
  pools?: KubernetesPool[];
  required_pools?: RequiredPools[] | null;
  installed_applications?: KubernetesInstalledApplication[] | null;
  firewall_id?: string;
  cni_plugin?: string;
  ccm_installed?: string;
  conditions: Condition[];
};

// PaginatedKubernetesClusters is a Kubernetes k3s cluster
export type PaginatedKubernetesClusters = {
  page: number;
  per_page: number;
  pages: number;
  items: KubernetesCluster[];
};

// KubernetesClusterPoolConfig is used to create a new cluster pool
export type KubernetesClusterPoolConfig = {
  id?: string;
  region?: string;
  count?: number;
  size?: string;
  public_ip_node_pool?: boolean;
};

// KubernetesClusterConfig is used to create a new cluster
export type KubernetesClusterConfig = {
  name?: string;
  region?: string;
  cluster_type?: string;
  num_target_nodes?: number;
  target_nodes_size?: string;
  kubernetes_version?: string;
  node_destroy?: string;
  network_id?: string;
  tags?: string;
  pools?: KubernetesClusterPoolConfig[];
  applications?: string;
  instance_firewall?: string;
  firewall_rule?: string;
  cni_plugin?: string;
};

// KubernetesPlanConfiguration is a value within a configuration for
// an application's plan
export type KubernetesPlanConfiguration = {
  value: string;
};

export type KubernetesMarketplacePlan = {
  label: string;
  configuration: Record<string, KubernetesPlanConfiguration>;
};

// KubernetesMarketplaceApplication is an application within our marketplace
// available for installation
export type KubernetesMarketplaceApplication = {
  name: string;
  title?: string;
  version: string;
  default?: boolean;
  dependencies?: Array<string>;
  maintainer: string;
  description: string;
  post_install: string;
  url: string;
  category: string;
  plans: KubernetesMarketplacePlan[];
};

// KubernetesVersion represents an available version of k3s to install
export type KubernetesVersion = {
  label: string;
  version: string;
  type: string;
  default?: boolean;
  clusterType?: string;
};

// LoadBalancerBackend represents a backend instance being load-balanced
export type LoadBalancerBackend = {
  ip: string;
  protocol?: string;
  source_port: number;
  target_port: number;
  health_check_port: number;
};

// LoadBalancerBackendConfig is the configuration for creating backends
export type LoadBalancerBackendConfig = {
  ip: string;
  protocol?: string;
  source_port: number;
  target_port: number;
  health_check_port?: number;
};

// LoadBalancerOptions are additional loadbalancer options
export type LoadBalancerOptions = {
  server_timeout?: string;
  client_timeout?: string;
};

// LoadBalancer represents a load balancer configuration within Civo
export type LoadBalancer = {
  id: string;
  name: string;
  algorithm: string;
  backends: LoadBalancerBackend[];
  external_traffic_policy?: string;
  session_affinity?: string;
  session_affinity_config_timeout?: number;
  enable_proxy_protocol?: string;
  public_ip: string;
  private_ip: string;
  firewall_id: string;
  cluster_id?: string;
  state: string;
  reserved_ip_id?: string;
  reserved_ip_name?: string;
  reserved_ip?: string;
  max_concurrent_requests?: number;
  options?: LoadBalancerOptions;
};

// LoadBalancerConfig represents a load balancer to be created
export type LoadBalancerConfig = {
  region?: string;
  name: string;
  network_id: string;
  algorithm?: string;
  backends: LoadBalancerBackendConfig[];
  external_traffic_policy?: string;
  session_affinity?: string;
  session_affinity_config_timeout?: number;
  enable_proxy_protocol?: string;
  cluster_id?: string;
  firewall_id?: string;
  firewall_rule?: string;
  max_concurrent_requests?: number;
  options: LoadBalancerOptions;
};

// LoadBalancerUpdateConfig represents a load balancer to be updated
export type LoadBalancerUpdateConfig = {
  region?: string;
  name?: string;
  algorithm?: string;
  backends: LoadBalancerBackendConfig[];
  external_traffic_policy?: string;
  session_affinity?: string;
  session_affinity_config_timeout?: number;
  enable_proxy_protocol?: string;
  firewall_id?: string;
  max_concurrent_requests?: number;
  options?: LoadBalancerOptions;
};

// ObjectStore is the struct for the ObjectStore model
export type BucketOwner = {
  access_key_id?: string;
  name?: string;
  credential_id?: string;
};

// BucketOwner is the struct for owner details of an Object Store
export type ObjectStore = {
  id: string;
  name: string;
  max_size: number;
  owner_info: BucketOwner;
  objectstore_endpoint: string;
  status: string;
};

// CreateObjectStoreRequest holds the request to create a new object storage
export type CreateObjectStoreRequest = {
  name: string;
  max_size_gb: number;
  access_key_id: string;
  region?: string;
};

// UpdateObjectStoreRequest holds the request to update a specified object storage's details
export type UpdateObjectStoreRequest = {
  max_size_gb: number;
  region?: string;
};

export type ObjectStoreCredential = {
  id: string;
  name: string;
  access_key_id: string;
  secret_access_key_id: string;
  max_size_gb: number;
  suspended: boolean;
  status: string;
};

export type CreateObjectStoreCredentialRequest = {
  name: string;
  access_key_id: string;
  secret_access_key_id: string;
  max_size_gb?: number;
  region?: string;
};

export type UpdateObjectStoreCredentialRequest = {
  access_key_id: string;
  secret_access_key_id: string;
  max_size_gb: number;
  region?: string;
};

// Organisation represents a group of accounts treated as a single entity
export type Organization = {
  id: string;
  name: string;
  token: string;
  created_at?: string;
  updated_at?: string;
};

export type Permission = {
  code: string;
  name?: string;
  description?: string;
};

export type KubernetesClusterPoolUpdateConfig = {
  id: string;
  count: number;
  size: string;
  label: Record<string, string>;
  taints: Taint[];
  public_ip_node_pool?: boolean;
  region?: string;
};

export type Quota = {
  id: string;
  default_user_id: string;
  default_user_email_address: string;
  instance_count_limit: number;
  instance_count_usage: number;
  cpu_core_limit: number;
  cpu_core_usage: number;
  ram_mb_limit: number;
  ram_mb_usage: number;
  disk_gb_limit: number;
  disk_gb_usage: number;
  disk_volume_count_limit: number;
  disk_volume_count_usage: number;
  disk_snapshot_count_limit: number;
  disk_snapshot_count_usage: number;
  public_ip_address_limit: number;
  public_ip_address_usage: number;
  subnet_count_limit: number;
  subnet_count_usage: number;
  network_count_limit: number;
  network_count_usage: number;
  security_group_limit: number;
  security_group_usage: number;
  security_group_rule_limit: number;
  security_group_rule_usage: number;
  port_count_limit: number;
  port_count_usage: number;
  loadbalancer_count_limit: number;
  loadbalancer_count_usage: number;
  objectstore_gb_limit: number;
  objectstore_gb_usage: number;
  database_count_limit: number;
  database_count_usage: number;
  database_snapshot_count_limit: number;
  database_snapshot_count_usage: number;
  database_cpu_core_limit: number;
  database_cpu_core_usage: number;
  database_ram_mb_limit: number;
  database_ram_mb_usage: number;
  database_disk_gb_limit: number;
  database_disk_gb_usage: number;
};

export type Feature = {
  iaas: boolean;
  kubernetes: boolean;
  object_store: boolean;
  loadbalancer: boolean;
  dbaas: boolean;
  volume: boolean;
  paas: boolean;
  kfaas: boolean;
  public_ip_node_pools?: boolean;
};

export type Region = {
  code: string;
  name: string;
  type: string;
  out_of_capacity: boolean;
  country: string;
  country_name: string;
  features: Feature;
  default: boolean;
};

export type Role = {
  id: string;
  name?: string;
  permissions?: string;
  built_in?: boolean;
  created_at?: string;
  updated_at?: string;
};

export type SSHKey = {
  id: string;
  name: string;
  fingerprint: string;
  public_key: string;
  created_at?: string;
};

export type Team = {
  id: string;
  name?: string;
  created_at?: string;
  updated_at?: string;
};

export type TeamMember = {
  id: string;
  team_id?: string;
  user_id?: string;
  permissions?: string;
  roles?: string;
  created_at?: string;
  updated_at?: string;
};

export type User = {
  id: string;
  first_name: string;
  last_name: string;
  company_name: string;
  email_address: string;
  status: string;
  flags: string;
  token: string;
  marketing_allowed: number;
  default_account_id: string;
  password_digest: string;
  partner: string;
  partner_user_id: string;
  referral_id: string;
  last_chosen_region: string;
  created_at?: string;
  updated_at?: string;
};

export type UserEverything = {
  user: User;
  accounts: Account[];
  organizations: Organization[];
  teams: Team[];
  roles: Role[];
};

// Volume is a block of attachable storage for our IAAS products
// https://www.civo.com/api/volumes
export type Volume = {
  id: string;
  name: string;
  instance_id: string;
  cluster_id: string;
  network_id: string;
  mountpoint: string;
  status: string;
  size_gb: number;
  bootable: boolean;
  created_at: string;
};

// VolumeResult is the response from one of our simple API calls
export type VolumeResult = {
  id: string;
  name: string;
  result: string;
};

// VolumeConfig are the settings required to create a new Volume
export type VolumeConfig = {
  name: string;
  namespace: string;
  cluster_id: string;
  network_id: string;
  region: string;
  size_gb: number;
  bootable: boolean;
};

// Webhook is a representation of a saved webhook callback from changes in Civo
export type Webhook = {
  id: string;
  events: Array<string>;
  url: string;
  secret: string;
  disabled: boolean;
  failures: number;
  last_failure_reason: string;
};

// WebhookConfig represents the options required for creating a new webhook
export type WebhookConfig = {
  events: Array<string>;
  url: string;
  secret: string;
};

export function createPaginatedResponse<T>(schema: z.ZodType<T>) {
  return z.object({
    page: z.number(),
    per_page: z.number(),
    pages: z.number(),
    items: z.array(schema),
  });
}
