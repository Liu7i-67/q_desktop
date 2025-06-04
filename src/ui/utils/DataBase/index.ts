import { TDataBase } from "./type";
import { TJson, TJsonValue } from "../interface";
import { toJS } from "@quarkunlimit/qu-mobx";
import UserHelper from "../user-helper";

const DB_NAME = "tx-local-setting";
const DB_TABLES: TDataBase[] = ["TABLE", "SEARCH"];
const DB_VERSION = DB_TABLES.length + 2;
const DB_USABLE = typeof indexedDB !== "undefined";

export const getData = async (type: TDataBase): Promise<any> => {
  if (!DB_USABLE) {
    return new Promise((res, rej) => {
      const data = localStorage.get(
        `${type}_${UserHelper.getInstance().getUserId}`
      );
      try {
        if (typeof data === "number") {
          res(data);
          return;
        }
        res(JSON.parse(data));
      } catch (error) {
        res(data);
      }
    });
  }

  return new Promise((res, rej) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onsuccess = (e) => {
      const db = (e.target as IDBRequest<IDBDatabase>).result;

      if (!db || !db.objectStoreNames.contains(type)) {
        res(null);
        return;
      }

      // 查询数据
      const getTransaction = db.transaction([type], "readonly");
      const getStore = getTransaction.objectStore(type);
      const getRequest = getStore.get(UserHelper.getInstance().getUserId);

      getRequest.onsuccess = (event) => {
        const data = (event.target as IDBRequest<IDBDatabase>)?.result;
        // @ts-ignore
        res(data?.data);
      };
    };

    req.onupgradeneeded = onupgradeneeded;
  });
};

export const saveData = async (type: TDataBase, data_: any) => {
  const data = toJS(data_);
  if (!DB_USABLE) {
    return new Promise((res, rej) => {
      localStorage.set(
        `${type}_${UserHelper.getInstance().getUserId}`,
        typeof data === "number" ? data : JSON.stringify(data)
      );
      res(true);
    });
  }

  return new Promise((res, rej) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);

    req.onsuccess = (e) => {
      const db = (e.target as IDBRequest<IDBDatabase>).result;

      // 保存数据逻辑
      const transaction = db.transaction([type], "readwrite");
      const store = transaction.objectStore(type);

      const getRequest = store.get(UserHelper.getInstance().getUserId);

      getRequest.onsuccess = (event) => {
        const oldData = (event.target as IDBRequest<IDBDatabase>).result;
        if (oldData) {
          store.put({ data, id: UserHelper.getInstance().getUserId });
        } else {
          store.add({ data, id: UserHelper.getInstance().getUserId });
        }
      };
      res(true);
    };

    req.onerror = () => {
      res(false);
    };

    req.onupgradeneeded = onupgradeneeded;
  });
};

const onupgradeneeded = (e: IDBVersionChangeEvent) => {
  const db = (e.target as IDBRequest<IDBDatabase>).result;

  for (let i of DB_TABLES) {
    if (!db.objectStoreNames.contains(i)) {
      db.createObjectStore(i, { keyPath: "id" });
    }
  }
};

export const getAllData = () => {
  const allData: TJson = {};
  if (!DB_USABLE) {
    return new Promise((res, rej) => {
      for (let type of DB_TABLES) {
        const data = localStorage.get(type);
        try {
          if (typeof data === "number") {
            allData[type] = data;
            continue;
          }
          allData[type] = JSON.parse(data);
        } catch (error) {
          allData[type] = data;
        }
      }
      res(allData);
    });
  }

  return new Promise((res, rej) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION);
    let count = 0;

    req.onsuccess = (e) => {
      const db = (e.target as IDBRequest<IDBDatabase>).result;

      if (!db) {
        res(null);
        return;
      }

      for (let type of DB_TABLES) {
        // 查询数据
        const getTransaction = db.transaction([type], "readonly");
        const getStore = getTransaction.objectStore(type);
        const getRequest = getStore.get(UserHelper.getInstance().getUserId);
        getRequest.onsuccess = (event) => {
          const data = (event.target as IDBRequest<IDBDatabase>)?.result;
          allData[type] = data as unknown as TJsonValue;
          count += 1;
          if (count === DB_TABLES.length) {
            res(allData);
          }
        };

        getRequest.onerror = (event) => {
          res(null);
        };
      }
    };
  });
};

// 新增删除本地 IndexedDB 的方法
export const deleteIndexedDB = () => {
  if (!DB_USABLE) {
    return new Promise((res, rej) => {
      // 如果 IndexedDB 不可用，尝试删除 localStorage 中的相关数据
      for (let type of DB_TABLES) {
        localStorage.removeItem(
          `${type}_${UserHelper.getInstance().getUserId}`
        );
      }
      res(true);
    });
  }

  return new Promise((res, rej) => {
    const req = indexedDB.deleteDatabase(DB_NAME);

    req.onsuccess = () => {
      res(true);
    };

    req.onerror = () => {
      res(false);
    };

    req.onblocked = () => {
      res(false);
    };
  });
};

export * from "./interface";
export * from "./type";
export * from "./baseInfo";
