import "./loadEnvironment.js";
import chalk from "chalk";
import createDebug from "debug";
import app from "./server/index.js";
import connectToDatabase from "./database/connectToDatabase.js";

const debug = createDebug("students-api:root");

const port = process.env.PORT ?? 4000;
const mongoDbConnection = process.env.MONGODB_CONNECTION;

if (!mongoDbConnection) {
  debug(chalk.red("Missing environment variables. Exiting..."));
  process.exit(1);
}

app.listen(port, () => {
  debug(`Listening on ${chalk.green(`http://localhost:${port}`)}`);
});

try {
  await connectToDatabase(mongoDbConnection);

  debug(chalk.blue("Connected to database"));
} catch (error: unknown) {
  debug(`Error connecting to database: ${chalk.red((error as Error).message)}`);
}
