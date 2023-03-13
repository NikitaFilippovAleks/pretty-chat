import { TemplateDelegate } from 'handlebars';

import EventBus from './EventBus';

type BlockTypes<P = any> = {
  'init': [],
  'component-did-mount': [],
  'render': [],
  'component-did-update': [P, P]
}

class Block<Props extends { [key: string]: any } = any, Element extends HTMLElement = HTMLElement> {
  static EVENTS = {
    INIT: 'init',
    CDM: 'component-did-mount',
    RENDER: 'render',
    CDU: 'component-did-update'
  } as const;

  id = window.crypto.getRandomValues(new Uint32Array(1)).toString();
  private _element: Element;
  private eventBus: EventBus<BlockTypes<Props>>;
  props: Props;
  children: Record<string, any>;

  constructor(propsAndChildren: Props = {} as Props) {
    const eventBus = new EventBus();

    const { props, children } = this._getPropsAndChildren(propsAndChildren as Props);

    this.props = this._makePropsProxy(props);
    this.children = children;
    this.eventBus = eventBus;

    this._registerEvents(eventBus);
    this.eventBus.emit(Block.EVENTS.INIT);
  }

  private _registerEvents(eventBus: EventBus<BlockTypes>) {
    eventBus.on(Block.EVENTS.INIT, this._init.bind(this));
    eventBus.on(Block.EVENTS.CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.RENDER, this._render.bind(this));
    eventBus.on(Block.EVENTS.CDU, this._componentDidUpdate.bind(this));
  }

  private _init() {
    this.init();
    this.eventBus.emit(Block.EVENTS.RENDER);
  }

  protected init(): void | null {
    return null;
  }

  private _componentDidMount() {
    this.componentDidMount();
  }

  protected componentDidMount() {
    return true;
  }

  dispatchComponentDidMount() {
    this.eventBus.emit(Block.EVENTS.CDM);

    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach(component => component.dispatchComponentDidMount());
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  private _render() {
    const fragment = this.render();
    const newElement = fragment.firstChild as Element;

    if (this._element) {
      this._removeEvents();

      this._element.replaceWith(newElement);
    }

    this._element = newElement;

    this._addEvents();
  }

  protected render(): DocumentFragment {
    return new DocumentFragment();
  }

  private _componentDidUpdate(oldProps?: Props, newProps?: Props) {
    if (this.componentDidUpdate(oldProps, newProps)) {
      this.eventBus.emit(Block.EVENTS.RENDER);
    }
  }

  protected componentDidUpdate(oldProps?: Props, newProps?: Props) {
    if (oldProps && newProps) return true;
    return false;
  }

  private _getPropsAndChildren(propsAndChildren: Props) {
    const props = {} as Props;
    const children: Record<string, Block<Props> | Block<Props>[]> = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (Array.isArray(value) && value.every(el => el instanceof Block)) {
        children[key] = value;
      } else if (value instanceof Block) {
        children[key] = value;
      } else {
        props[key as keyof Props] = value;
      }
    });

    return { props, children };
  }

  private _makePropsProxy(props: Props) {
    return new Proxy(props, {
      get(target, prop) {
        const value = target[prop as keyof Props];

        return typeof value === 'function' ? value.bind(target) : value;
      },
      set: (target, prop, value) => {
        const oldTarget = { ...target };

        target[prop as keyof Props] = value;

        this.eventBus.emit(Block.EVENTS.CDU, oldTarget, target);
        return true;
      }
    });
  }

  private _addEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach(eventName => this._element.addEventListener(eventName, events[eventName]));
  }

  private _removeEvents() {
    const { events = {} } = this.props;

    Object.keys(events).forEach(eventName => this._element.removeEventListener(eventName, events[eventName]));
  }

  protected compile(template: TemplateDelegate, props: Props) {
    const propsAndStubs: { [key: string]: any } = { ...props };

    Object.entries(this.children).forEach(([name, component]) => {
      if (Array.isArray(component)) {
        propsAndStubs[name] = component.map(child => `<div data-id="${child.id}"></div>`);
      } else {
        propsAndStubs[name] = `<div data-id="${component.id}"></div>`;
      }
    });

    const html = template(propsAndStubs as Props);

    const stubTemplate = document.createElement('template');

    stubTemplate.innerHTML = html;

    Object.entries(this.children).forEach(([_, component]) => {
      if (Array.isArray(component)) {
        component.forEach(child => this._replaceStubWithContent(stubTemplate, child));
      } else {
        this._replaceStubWithContent(stubTemplate, component);
      }
    });

    return stubTemplate.content;
  }

  private _replaceStubWithContent(stubTemplate: HTMLTemplateElement, component: Block<Props>) {
    const stub = stubTemplate.content.querySelector(`[data-id="${component.id}"]`);

    if (!stub) return;

    stub.replaceWith(component.getContent());
  }

  setProps = (nextProps: Partial<Props>) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  get element() {
    return this._element;
  }

  getContent() {
    return this.element;
  }

  show() {
    this.element.style.display = 'block';
  }

  hide() {
    this.element.style.display = 'none';
  }
}

export default Block;
