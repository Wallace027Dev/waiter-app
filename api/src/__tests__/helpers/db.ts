import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

let mongod: MongoMemoryServer;

/** Sobe um MongoDB em memória e conecta o mongoose. */
export async function connect(): Promise<void> {
  mongod = await MongoMemoryServer.create();
  await mongoose.connect(mongod.getUri());
}

/** Limpa todas as coleções entre os testes. */
export async function clearDatabase(): Promise<void> {
  const { collections } = mongoose.connection;
  for (const key of Object.keys(collections)) {
    await collections[key].deleteMany({});
  }
}

/** Fecha a conexão e derruba o servidor em memória. */
export async function closeDatabase(): Promise<void> {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await mongod.stop();
}
