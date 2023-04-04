import Block from '../utils/Block';

export interface BlockConstructable<P extends { [key: string]: any; } = any> {
  new (props: P): Block<P>
}

function isEqual(lhs: string, rhs: string): boolean {
  return lhs === rhs;
}

function render(query: string, block: Block<any>) {
  const root = document.querySelector(query);

  if (root === null) {
    throw new Error(`Root not found by selector "${query}".`);
  }

  root.innerHTML = '';
  root.append(block.getContent());

  return root;
}

class Route {
  private _block: Block<any> | null = null;

  constructor(
    private _pathname: string,
    private readonly _blockClass: BlockConstructable,
    private readonly _query: string
  ) { }

  leave() {
    this._block = null;
  }

  match(pathname: string) {
    return isEqual(pathname, this._pathname);
  }

  render() {
    if (!this._block) {
      const block = new this._blockClass({});

      render(this._query, block);

      block.dispatchComponentDidMount();
    }
  }
}

export class Router {
  private static __instance: Router;
  private _routes: Route[] = [];
  private _currentRoute: Route | null = null;
  private _history = window.history;

  constructor(private readonly _rootQuery: string) {
    if (Router.__instance) {
      return Router.__instance;
    }

    this._routes = [];
    Router.__instance = this;
  }

  use(pathname: string, block: BlockConstructable) {
    this._routes.push(new Route(pathname, block, this._rootQuery));

    return this;
  }

  go(pathname: string) {
    this._history.pushState({}, '', pathname);

    this._onRoute(pathname);
  }

  back() {
    this._history.back();
  }

  forward() {
    this._history.forward();
  }

  replace(pathname: string) {
    this._history.replaceState({}, '', pathname);

    this._onRoute(pathname);
  }

  start() {
    window.onpopstate = (event: PopStateEvent) => {
      const target = event.currentTarget as Window;

      this._onRoute(target.location.pathname);
    };

    this._onRoute(window.location.pathname);
  }

  private _onRoute(pathname: string) {
    const route = this._getRoute(pathname);

    if (!route) {
      return;
    }

    if (this._currentRoute && this._currentRoute !== route) {
      this._currentRoute.leave();
    }

    this._currentRoute = route;

    route.render();
  }

  private _getRoute(pathname: string) {
    return this._routes.find(route => route.match(pathname));
  }
}

export default new Router('#root');
