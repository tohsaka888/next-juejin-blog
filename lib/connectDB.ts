import clientPromise from "./mongodb";

async function connectDB() {
  const result = await clientPromise;
  const dbName = process.env.DBNAME;
  const db = result.db(dbName);
  return db;
}

export default connectDB;
