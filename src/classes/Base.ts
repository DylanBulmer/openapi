export class Base<T> {
  protected _doc: Partial<T> = {};

  constructor(doc: Partial<T> = {}) {
    this._doc = doc;
  }

  doc(): T {
    return { ...this._doc } as T;
  }
}

export class BaseDescriptive<
  T extends { summary?: string; description?: string },
> extends Base<T> {
  summary(value: string) {
    this._doc.summary = value;
    return this;
  }

  description(value: string) {
    this._doc.description = value;
    return this;
  }
}
