import { MongoMemoryReplSet } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongod;

export async function setupTestDB() {
  mongod = await MongoMemoryReplSet.create({ replSet: { count: 1 } });
  const uri = mongod.getUri();
  await mongoose.connect(uri);
}

export async function teardownTestDB() {
  await mongoose.disconnect();
  await mongod.stop();
}
