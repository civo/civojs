import { expect, test } from 'vitest';
import { Civo } from '../src/index';
import {
	AccountApi,
	ActionApi,
	ApplicationApi,
	ChargeApi,
	DNSDomainApi,
	DatabaseApi,
	DatabaseBackupApi,
	DiskImagesApi,
	FirewallApi,
	IPApi,
	InstancesApi,
	KfClusterApi,
	KubernetesApi,
	LoadBalancerApi,
	NetworksApi,
	ObjectStoreApi,
	OrganizationApi,
	PermissionApi,
	PoolApi,
	QuotaApi,
	RegionsApi,
	RoleApi,
	SSHKeyApi,
	SubnetsApi,
	TeamApi,
	UserApi,
	VolumeApi,
	WebhookApi,
} from '../src/resources';

const config = {
	apiKey: 'testKey',
	regionCode: 'LON1',
};

const client = new Civo(config);

test('Civo class initialization', () => {
	expect(client.accounts).toBeInstanceOf(AccountApi);
	expect(client.actions).toBeInstanceOf(ActionApi);
	expect(client.applications).toBeInstanceOf(ApplicationApi);
	expect(client.charges).toBeInstanceOf(ChargeApi);
	expect(client.databases).toBeInstanceOf(DatabaseApi);
	expect(client.databaseBackups).toBeInstanceOf(DatabaseBackupApi);
	expect(client.diskImages).toBeInstanceOf(DiskImagesApi);
	expect(client.dns).toBeInstanceOf(DNSDomainApi);
	expect(client.firewalls).toBeInstanceOf(FirewallApi);
	expect(client.instances).toBeInstanceOf(InstancesApi);
	expect(client.ips).toBeInstanceOf(IPApi);
	expect(client.kfclusters).toBeInstanceOf(KfClusterApi);
	expect(client.kubernetes).toBeInstanceOf(KubernetesApi);
	expect(client.loadbalancers).toBeInstanceOf(LoadBalancerApi);
	expect(client.networks).toBeInstanceOf(NetworksApi);
	expect(client.subnets).toBeInstanceOf(SubnetsApi);
	expect(client.objectStore).toBeInstanceOf(ObjectStoreApi);
	expect(client.organizations).toBeInstanceOf(OrganizationApi);
	expect(client.permissions).toBeInstanceOf(PermissionApi);
	expect(client.pools).toBeInstanceOf(PoolApi);
	expect(client.quotas).toBeInstanceOf(QuotaApi);
	expect(client.regions).toBeInstanceOf(RegionsApi);
	expect(client.roles).toBeInstanceOf(RoleApi);
	expect(client.sshKeys).toBeInstanceOf(SSHKeyApi);
	expect(client.teams).toBeInstanceOf(TeamApi);
	expect(client.users).toBeInstanceOf(UserApi);
	expect(client.volumes).toBeInstanceOf(VolumeApi);
	expect(client.webhooks).toBeInstanceOf(WebhookApi);
});
