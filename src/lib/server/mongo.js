import { MongoClient, ServerApiVersion } from 'mongodb';
import { MONGODB_URI } from '$env/static/private';

const client = new MongoClient(MONGODB_URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

let dbPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoDbPromise) {
    global._mongoDbPromise = client.connect().then(client => client.db("myVideoApp"));
  }
  dbPromise = global._mongoDbPromise;
} else {
  dbPromise = client.connect().then(client => client.db("myVideoApp"));
}

export default dbPromise;