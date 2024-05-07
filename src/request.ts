import { type $Fetch, type FetchOptions, ofetch } from 'ofetch';

export interface Config {
  apiKey: string;
  regionCode?: string;
  customHeaders?: Record<string, unknown>;
}

export type RequestMethod = 'DELETE' | 'POST' | 'GET' | 'PUT';

class Client {
  private ofetchClient: $Fetch;
  public regionCode: string;

  constructor(config: Config) {
    this.ofetchClient = this.createClient(config);
    this.regionCode = config.regionCode || 'NYC1';
  }

  createClient(config: Config): $Fetch {
    const client = ofetch.create({
      baseURL: 'https://api.civo.com/v2',
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
      },
      params: { region: config.regionCode },
    });

    return client;
  }

  async request<T>(
    method: RequestMethod,
    path: string,
    payload?: Record<string, unknown>,
    params?: FetchOptions['params'],
    customHeaders?: HeadersInit,
  ): Promise<T> {
    return await this.ofetchClient<T>(path, {
      method,
      headers: customHeaders,
      body: payload,
      params,
    });
  }
}

export default Client;
