import { Client, Account, Databases, Storage } from "appwrite";

// Initialize the Appwrite client
const client = new Client();

client
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID);

// Initialize Appwrite services
export const account = new Account(client);
export const database = new Databases(client);   // ⚡ replaces Databases
export const buckets = new Storage(client);

export { client };
