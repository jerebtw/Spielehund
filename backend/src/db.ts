import chalk from "chalk";
import mysql from "mysql2/promise";

async function connectDB(DB_HOST: string) {
  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: "root",
    password: "test",
    database: "Schule",
  });

  console.info(`Connected to ${chalk.bold("DB")}`);
  return connection;
}

export { connectDB };
