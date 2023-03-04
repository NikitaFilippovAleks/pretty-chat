export enum Methods {
  GET = 'GET',
  PUT = 'PUT',
  POST = 'POST',
  DELETE = 'DELETE'
}

interface InterfaceOptions {
  method: Methods,
  data: Record<string, unknown>,
  options: Record<string, string>,
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
  get = (url: string, options: InterfaceOptions) => {
    let newUrl = url;

    if (options.data) newUrl += queryStringify(options.data);

    return this.request(newUrl, { ...options, method: Methods.GET }, options.timeout);
  };

  put = (url: string, options: InterfaceOptions) => this.request(url, { ...options, method: Methods.PUT }, options.timeout);

  post = (url: string, options: InterfaceOptions) => this.request(url, { ...options, method: Methods.POST }, options.timeout);

  delete = (url: string, options: InterfaceOptions) => this.request(url, { ...options, method: Methods.DELETE }, options.timeout);

  request = (url: string, options: InterfaceOptions, timeout = 5000) => {
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

        resolve(xhr);
      };

      xhr.onabort = reject;
      xhr.onerror = reject;
      xhr.ontimeout = reject;

      if (method === Methods.GET || !data) xhr.send();
      else xhr.send();
    });
  };
}

export default HTTPTransport;
