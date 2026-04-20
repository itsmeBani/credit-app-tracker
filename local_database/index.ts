
import { Database } from '@nozbe/watermelondb'
import SQLiteAdapter from '@nozbe/watermelondb/adapters/sqlite'
import * as Crypto from 'expo-crypto'
import {schema} from './schema/schema'
import migrations from './migrations/migrations'
import ModelProductCategory from "./model/model.productCategory";
import ModelCredit from "./model/model.credits";
import ModelProducts from "./model/model.products";
import ModelUsers from "./model/model.users";
import { setGenerator } from "@nozbe/watermelondb/utils/common/randomId"

// import Post from './model/Post' // ⬅️ You'll import your Models here

// First, create the adapter to the underlying database:
const adapter = new SQLiteAdapter({
    schema,
    // (You might want to comment it out for development purposes -- see Migrations documentation)
    migrations,
    // (optional database name or file system path)
    // dbName: 'myapp',
    // (recommended option, should work flawlessly out of the box on iOS. On Android,
    // additional installation steps have to be taken - disable if you run into issues...)
    jsi: true, /* Platform.OS === 'ios' */
    // (optional, but you should implement this method)
    onSetUpError: error => {
        // Database failed to load -- offer the user to reload the app or log out
    },
})

// Then, make a Watermelon database from it!
setGenerator(() => Crypto.randomUUID())

export const localDatabase = new Database({
    adapter,
    modelClasses: [
        ModelProductCategory,
        ModelCredit,
        ModelProducts,
        ModelUsers
    ],

})