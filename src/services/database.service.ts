import * as mongoDB from 'mongodb';
import User from '../models/user.model';
import Service from '../models/service.model';

export const connectToDatabase = async (): Promise<{
  mongoClient: mongoDB.MongoClient;
  usersCollection: mongoDB.Collection<User>;
  servicesCollection: mongoDB.Collection<Service>;
}> => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.MONGO_URI || process.exit(1)
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.MONGO_DB_NAME);

  const usersCollection: mongoDB.Collection<User> = db.collection(
    process.env.USERS_COLLECTION_NAME || process.exit(1)
  );

  const servicesCollection: mongoDB.Collection<Service> = db.collection(
    process.env.SERVICES_COLLECTION_NAME || process.exit(1)
  );

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`
  );

  return { mongoClient: client, usersCollection, servicesCollection };
};
