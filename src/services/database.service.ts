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

  // let collections: string[] = [];
  // db.listCollections().toArray((err, items) => {
  //   if (items != undefined) {
  //     items.forEach((i) => {
  //       console.log(i.name);

  //       collections = [...collections, i.name];
  //     });
  //   }
  // });

  // if (
  //   collections.includes(
  //     <string>process.env.USERS_COLLECTION_NAME ||
  //       <string>process.env.SERVICES_COLLECTION_NAME
  //   )
  // ) {
  //   console.log('collections already made!');
  // }

  const usersCollection: mongoDB.Collection<User> = db.collection(
    process.env.USERS_COLLECTION_NAME || process.exit(1)
  );

  // throws error is collection exists... need to check for collections before creation
  const servicesCollection: mongoDB.Collection<Service> =
    await db.createCollection(
      process.env.SERVICES_COLLECTION_NAME || process.exit(1),
      {
        validator: {
          $jsonSchema: {
            bsonType: 'object',
            required: ['date', 'seats'],
            additionalProperties: false,
            properties: {
              _id: {},
              date: {
                bsonType: 'string',
                description: "'date' is required and is a string",
              },
              seats: {
                bsonType: 'number',
                minimum: 0,
                maximum: 10,
                description: "'seats' is required and is a number",
              },
            },
          },
        },
      }
    );

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${usersCollection.collectionName}`
  );

  return { mongoClient: client, usersCollection, servicesCollection };
};
