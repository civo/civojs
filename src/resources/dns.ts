import type {
  DNSDomain,
  DNSRecord,
  DNSRecordConfig,
  SimpleResponse,
} from '../types';
import BaseResource from './base';

export class DNSDomainResource extends BaseResource {
  list() {
    const path = '/dns';
    return this.client.request<DNSDomain[]>('GET', path);
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

  create(name: string) {
    const path = '/dns';
    const payload = { name };
    return this.client.request<DNSDomain>('POST', path, payload);
  }

  async get(name: string) {
    const items = await this.list();
    const found = items.find((item) => item.name.includes(name));
    if (found) {
      return found;
    }
    throw new Error('DNS Domain not found');
  }

  update(name: string, data: DNSDomain) {
    const path = `/dns/${data.id}`;
    const payload = { name };
    return this.client.request<DNSDomain>('PUT', path, payload);
  }

  destroy(data: DNSDomain) {
    const path = `/dns/${data.id}`;
    return this.client.request<SimpleResponse>('DELETE', path);
  }

  createRecord(domainId: string, data: DNSRecordConfig) {
    const path = `/dns/${domainId}/records`;
    return this.client.request<DNSRecord>('POST', path, data);
  }

  listRecords(domainId: string) {
    const path = `/dns/${domainId}/records`;
    return this.client.request<DNSRecord[]>('GET', path);
  }

  async getRecord(domainId: string) {
    const items = await this.listRecords(domainId);
    const found = items.find((item) => item.id === domainId);
    if (found) {
      return found;
    }
    throw new Error('DNS Record not found');
  }

  updateRecord(record: DNSRecord, data: DNSRecordConfig) {
    const path = `/dns/${record.domain_id}/records/${record.id}`;
    return this.client.request<DNSRecord>('PUT', path, data);
  }

  destroyRecord(data: DNSRecord) {
    const path = `/dns/${data.domain_id}/records/${data.id}`;
    return this.client.request<SimpleResponse>('DELETE', path);
  }
}
