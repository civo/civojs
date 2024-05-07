import type {
  CreateDatabaseRequest,
  Database,
  DatabaseBackup,
  DatabaseBackupCreateRequest,
  PaginatedResponse,
  RestoreDatabaseRequest,
  SimpleResponse,
  SupportedSoftwareVersion,
  UpdateDatabaseRequest,
} from '../types';
import BaseResource from './base';

export class DatabaseResource extends BaseResource {
  list() {
    const path = '/databases';
    return this.client.request<PaginatedResponse<Database>>('GET', path);
  }

  get(id: string) {
    const path = `/databases/${id}`;
    return this.client.request<Database>('GET', path);
  }

  destroy(id: string) {
    const path = `/databases/${id}`;
    return this.client.request<SimpleResponse>('DELETE', path);
  }

  create(data: CreateDatabaseRequest) {
    const path = '/databases';
    return this.client.request<Database>('POST', path, data);
  }

  update(id: string, data: UpdateDatabaseRequest) {
    const path = `/databases/${id}`;
    return this.client.request<Database>('PUT', path, data);
  }

  async find(search: string) {
    const lowerCaseSearch = search.toLowerCase();
    const { items } = await this.list();

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

  listVersions() {
    const path = '/databases/versions';
    return this.client.request<{ string: SupportedSoftwareVersion }>(
      'GET',
      path,
    );
  }

  restore(id: string, data: RestoreDatabaseRequest) {
    const path = `/databases/${id}/restore`;
    return this.client.request<SimpleResponse>('POST', path, data);
  }
}

export class DatabaseBackupResource extends BaseResource {
  list(id: string) {
    const path = `/databases/${id}/backups`;
    return this.client.request<DatabaseBackup>('GET', path);
  }

  update(id: string, data: Partial<DatabaseBackupCreateRequest>) {
    const path = `/databases/${id}/backups`;
    return this.client.request<DatabaseBackup>('PUT', path, data);
  }

  create(id: string, data: DatabaseBackupCreateRequest) {
    const path = `/databases/${id}/backups`;
    return this.client.request<DatabaseBackup>('POST', path, data);
  }
}
