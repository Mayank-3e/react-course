import { MongoClient } from "mongodb"

export default async function dbconnect()
{
  const client = await MongoClient.connect(`mongodb+srv://${process.env.dbusername}:${process.env.password}@cluster0.szwbefi.mongodb.net/meetups?retryWrites=true&w=majority`)
  const db = client.db()
  return [client, db.collection('meetups')]
}