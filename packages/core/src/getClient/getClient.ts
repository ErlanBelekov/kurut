import { Client } from 'pg';

let client: Client;

// create a DB connection and connection Pool
// returns node-postgres client on top of which queries are executed
export async function getClient(connectionString: string): Promise<Client> {
  if (!connectionString) {
    throw new Error('Provide a connection string');
  }

  if (!client) {
    client = new Client(connectionString);
    await client.connect();
  }

  return client;
}
