import * as mongoDB from 'mongodb';
import Game from '../models/games.model';

// export const collections: { games?: mongoDB.Collection<Game> } = {};

export const connectToDatabase = async (): Promise<
  mongoDB.Collection<Game>
> => {
  const client: mongoDB.MongoClient = new mongoDB.MongoClient(
    process.env.DB_CONN_STRING || process.exit(1)
  );

  await client.connect();

  const db: mongoDB.Db = client.db(process.env.DB_NAME);

  const gamesCollection: mongoDB.Collection<Game> = db.collection(
    process.env.GAMES_COLLECTION_NAME || process.exit(1)
  );

  // collections.games = gamesCollection;

  console.log(
    `Successfully connected to database: ${db.databaseName} and collection: ${gamesCollection.collectionName}`
  );

  return gamesCollection;
};
