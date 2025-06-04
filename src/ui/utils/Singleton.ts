export interface SingletonConstructor<T> {
  instance: T;
  getInstance(): T;
  new (): Singleton;
}

export interface Singleton {}

export function createSingleton<T>(): SingletonConstructor<T> {
  return class Singleton {
    static instance: T;
    static getInstance() {
      if (!Singleton.instance) {
        Singleton.instance = new this() as T;
      }
      return Singleton.instance as unknown as T;
    }
  };
}
