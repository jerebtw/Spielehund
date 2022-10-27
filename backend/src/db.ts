import chalk from "chalk";
import mysql from "mysql2/promise";

async function connectDB() {
  const connection = await mysql.createConnection({
    host: "192.168.1.169",
    user: "root",
    password: "test",
    database: "Schule",
  });

  console.info(`Connected to ${chalk.bold("DB")}`);
  return connection;
}

export { connectDB };
