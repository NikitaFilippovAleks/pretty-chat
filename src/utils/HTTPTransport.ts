export enum Methods {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE'
}

interface InterfaceOptions {
  method: Methods,
  data?: Record<string, unknown>,
  options?: Record<string, string>,
  timeout?: number,
  headers?: Record<string, string>
}

function queryStringify(data: Record<string, unknown>): string {
  const paramsArray: string[] = [];

  Object.entries(data).forEach(([key, value], index) => {
    const prefix = index === 0 ? '?' : '&';

    paramsArray.push(`${prefix}${key}=${value}`);
  });

  return paramsArray.join('');
}

class HTTPTransport {
  static API_URL = 'https://ya-praktikum.tech/api/v2';
  protected endpoint: string;

  constructor(endpoint: string) {
    this.endpoint = `${HTTPTransport.API_URL}${endpoint}`;
  }

  get<Response>(path: string, data?: { [key: string]: any }): Promise<Response> {
    let newPath = this.endpoint + path;

    if (data) newPath += queryStringify(data);

    return this.request(newPath, { method: Methods.GET });
  }

  put<Response>(path: string, data?: { [key: string]: any }): Promise<Response> {
    return this.request(
      this.endpoint + path,
      { method: Methods.PUT, data }
    );
  }

  post<Response>(path: string, data?: { [key: string]: any }): Promise<Response> {
    return this.request(
      this.endpoint + path,
      { method: Methods.POST, data }
    );
  }

  delete<Response>(path: string, data?: { [key: string]: any }): Promise<Response> {
    return this.request(
      this.endpoint + path,
      { method: Methods.DELETE, data }
    );
  }

  private request = <Response>(url: string, options: InterfaceOptions, timeout = 5000): Promise<Response> => {
    const { method, data, headers } = options;

    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.open(method, url);
      if (headers) Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value));

      const reqTimeout = setTimeout(() => {
        xhr.abort();
      }, timeout);

      xhr.onload = () => {
        clearTimeout(reqTimeout);

        resolve(xhr.response);
      };

      xhr.onreadystatechange = (e) => {
        if (xhr.readyState === XMLHttpRequest.DONE) {
          if (xhr.status < 400) {
            resolve(xhr.response);
          } else {
            reject(xhr.response);
          }
        }
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      xhr.withCredentials = true;
      xhr.responseType = 'json';

      if (method === Methods.GET || !data) xhr.send();
      else if (data instanceof FormData) xhr.send(data);
      else {
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));
      }
    });
  };
}

export default HTTPTransport;
