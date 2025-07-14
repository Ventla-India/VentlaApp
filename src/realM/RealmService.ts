// services/GenericRealmService.ts
import Realm from 'realm';

let realmInstance: Realm | null = null;

const getRealmInstance = (schemas: (Realm.ObjectClass | Realm.ObjectSchema)[]): Realm => {
  if (!realmInstance) {
    realmInstance = new Realm({
      schema: schemas,
      schemaVersion: 1,
    });
  }
  return realmInstance;
};

export function createRealmService<T extends Realm.Object>(schemaName: string, schemas: (Realm.ObjectClass | Realm.ObjectSchema)[]) {
  const realm = getRealmInstance(schemas);

  const getAll = (): T[] => {
    try {
      const results = realm.objects<T>(schemaName);
      return [...results];
    } catch (error) {
      console.error(`Error fetching all ${schemaName}:`, error);
      return [];
    }
  };

  const add = (item: any): void => {
    try {
      realm.write(() => {
        realm.create(schemaName, item, Realm.UpdateMode.Modified);
      });
    } catch (error) {
      console.error(`Error adding ${schemaName}:`, error);
    }
  };

  const addBulk = (items: any[]): void => {
    try {
      realm.write(() => {
        items.forEach((item) => {
          realm.create(schemaName, item, Realm.UpdateMode.Modified);
        });
      });
    } catch (error) {
      console.error(`Error adding bulk ${schemaName}:`, error);
    }
  };

  const update = (primaryKey: any, updatedFields: Partial<T>): void => {
    try {
      const object = realm.objectForPrimaryKey<T>(schemaName, primaryKey);
      if (object) {
        realm.write(() => {
          Object.assign(object, updatedFields);
        });
      }
    } catch (error) {
      console.error(`Error updating ${schemaName}:`, error);
    }
  };

  const deleteItem = (primaryKey: any): void => {
    try {
      const object = realm.objectForPrimaryKey<T>(schemaName, primaryKey);
      if (object) {
        realm.write(() => {
          realm.delete(object);
        });
      }
    } catch (error) {
      console.error(`Error deleting ${schemaName}:`, error);
    }
  };

  const deleteAll = (): void => {
    try {
      realm.write(() => {
        const all = realm.objects<T>(schemaName);
        realm.delete(all);
      });
    } catch (error) {
      console.error(`Error deleting all from ${schemaName}:`, error);
    }
  };

  return {
    getAll,
    add,
    addBulk,
    update,
    delete: deleteItem,
    deleteAll,
  };
}
