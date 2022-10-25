import chalk from "chalk";
import mysql from "mysql2/promise";

async function connectDB() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "test",
    database: "Schule",
  });

  console.info(`Connected to ${chalk.bold("DB")}`);
  return connection;
}

export { connectDB };
