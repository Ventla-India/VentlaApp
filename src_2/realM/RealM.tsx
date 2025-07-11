


import Realm from 'realm';
import { UserSchema, LinkedProgramSchema } from './schemas/UserSchemaas';

const realmConfig = {
  schema: [UserSchema, LinkedProgramSchema],
  schemaVersion: 2,
};

export const getRealm = async () => {
//   Realm.deleteFile({ path: 'default.realm' }); // ⛔ DEV ONLY
  return await Realm.open(realmConfig);
};