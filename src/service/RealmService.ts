import Realm from 'realm';
import ProductSchema from '../model/ProductModel';

let realm: Realm | null = null;

// Initialize Realm with error handling
const initializeRealm = () => {
  try {
    if (!realm) {
      realm = new Realm({ 
        schema: [ProductSchema],
        schemaVersion: 1,
      });
    }
    return realm;
  } catch (error) {
    console.error('Failed to initialize Realm:', error);
    throw error;
  }
};

const RealmService = {
  getAllProducts: () => {
    try {
      const realmInstance = initializeRealm();
      return realmInstance.objects('Product');
    } catch (error) {
      console.error('Error getting all products:', error);
      return [];
    }
  },

  //Addition of Product
  addProduct: (product: any) => {
    try {
      const realmInstance = initializeRealm();
      realmInstance.write(() => {
        realmInstance.create('Product', product);
      });
    } catch (error) {
      console.error('Error adding product:', error);
      throw error;
    }
  },

  //Update of Product
  updateProduct: (id: string, updatedProduct: any) => {
    try {
      const realmInstance = initializeRealm();
      const product = realmInstance.objectForPrimaryKey('Product', id);
      if (product) {
        realmInstance.write(() => {
          Object.keys(updatedProduct).forEach((key) => {
            (product as any)[key] = updatedProduct[key];
          });
        });
      }
    } catch (error) {
      console.error('Error updating product:', error);
      throw error;
    }
  },

  //Delete Product
  deleteProduct: (id: string) => {
    try {
      const realmInstance = initializeRealm();
      const product = realmInstance.objectForPrimaryKey('Product', id);
      if (product) {
        realmInstance.write(() => {
          realmInstance.delete(product);
        });
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      throw error;
    }
  },
};

export default RealmService;