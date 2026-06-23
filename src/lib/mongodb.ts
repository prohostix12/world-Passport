import mongoose from 'mongoose';
import dns from 'dns';

// Custom DNS servers removed to prevent querySrv ECONNREFUSED on some networks

// Override URI to use direct replica set to bypass DNS SRV issues on certain networks
let MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/gecouncil';
if (MONGODB_URI.includes('mongodb+srv://project_db_user')) {
  MONGODB_URI = 'mongodb://project_db_user:rARzaNSU1gSYCoxG@ac-zitrhe8-shard-00-00.rsc2vzb.mongodb.net:27017,ac-zitrhe8-shard-00-01.rsc2vzb.mongodb.net:27017,ac-zitrhe8-shard-00-02.rsc2vzb.mongodb.net:27017/gecouncil?ssl=true&replicaSet=atlas-9yit0t-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0';
}

interface MongooseCache {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  // eslint-disable-next-line no-var
  var mongoose: MongooseCache | undefined;
}

const cached: MongooseCache = global.mongoose ?? { conn: null, promise: null };
if (!cached.conn) {
  cached.promise = null;
}
global.mongoose = cached;

export async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URI, { family: 4 }).then((m) => {
      cached.conn = m;
      return m;
    }).catch((err) => {
      cached.promise = null;
      throw err;
    });
  }
  try {
    cached.conn = await cached.promise;
  } catch (err) {
    cached.promise = null;
    throw err;
  }
  return cached.conn;
}

export default connectDB;
