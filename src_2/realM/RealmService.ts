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

class GenericRealmService<T extends Realm.Object> {
  private schemaName: string;
  private realm: Realm;

  constructor(schemaName: string, schemas: (Realm.ObjectClass | Realm.ObjectSchema)[]) {
    this.schemaName = schemaName;
    this.realm = getRealmInstance(schemas);
  }

  getAll(): T[] {
    try {
      const results = this.realm.objects<T>(this.schemaName);
      return [...results];
    } catch (error) {
      console.error(`Error fetching all ${this.schemaName}:`, error);
      return [];
    }
  }

  add(item: any): void {
    try {
      this.realm.write(() => {
        this.realm.create(this.schemaName, item, Realm.UpdateMode.Modified);
      });
    } catch (error) {
      console.error(`Error adding ${this.schemaName}:`, error);
    }
  }

  addBulk(items: any[]): void {
    try {
      this.realm.write(() => {
        items.forEach((item) => {
          this.realm.create(this.schemaName, item, Realm.UpdateMode.Modified);
        });
      });
    } catch (error) {
      console.error(`Error adding bulk ${this.schemaName}:`, error);
    }
  }

  update(primaryKey: any, updatedFields: Partial<T>): void {
    try {
      const object = this.realm.objectForPrimaryKey<T>(this.schemaName, primaryKey);
      if (object) {
        this.realm.write(() => {
          Object.assign(object, updatedFields);
        });
      }
    } catch (error) {
      console.error(`Error updating ${this.schemaName}:`, error);
    }
  }

  delete(primaryKey: any): void {
    try {
      const object = this.realm.objectForPrimaryKey<T>(this.schemaName, primaryKey);
      if (object) {
        this.realm.write(() => {
          this.realm.delete(object);
        });
      }
    } catch (error) {
      console.error(`Error deleting ${this.schemaName}:`, error);
    }
  }

  deleteAll(): void {
    try {
      this.realm.write(() => {
        const all = this.realm.objects<T>(this.schemaName);
        this.realm.delete(all);
      });
    } catch (error) {
      console.error(`Error deleting all from ${this.schemaName}:`, error);
    }
  }
}

export default GenericRealmService;
