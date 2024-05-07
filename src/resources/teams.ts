import type { SimpleResponse, Team, TeamMember } from '../types';
import BaseResource from './base';

export class TeamResource extends BaseResource {
  list() {
    const path = '/teams';
    return this.client.request<Team[]>('GET', path);
  }

  create(name: string) {
    const path = '/teams';
    return this.client.request<Team>('POST', path, { name });
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

  rename(id: string, name: string) {
    const path = `/teams/${id}`;
    return this.client.request<Team>('PUT', path, { name });
  }

  destroy(id: string) {
    const path = `/teams/${id}`;
    return this.client.request<SimpleResponse>('DELETE', path);
  }

  listMembers(id: string) {
    const path = `/teams/${id}/members`;
    return this.client.request<TeamMember[]>('GET', path);
  }

  addMember(
    team_id: string,
    user_id: string,
    permissions: string,
    roles: string,
  ) {
    const path = `/teams/${team_id}/members`;
    return this.client.request<TeamMember>('POST', path, {
      user_id,
      permissions,
      roles,
    });
  }

  updateMember(
    team_id: string,
    team_member_id: string,
    permissions: string,
    roles: string,
  ) {
    const path = `/teams/${team_id}/members/${team_member_id}`;
    return this.client.request<TeamMember>('PUT', path, { permissions, roles });
  }

  destroyMember(team_id: string, team_member_id: string) {
    const path = `/teams/${team_id}/members/${team_member_id}`;
    return this.client.request<SimpleResponse>('DELETE', path);
  }
}
