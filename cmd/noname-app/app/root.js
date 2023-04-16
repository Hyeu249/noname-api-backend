const express = require("express");
const cors = require("cors");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");
const sequelize = require("@server/lib/sequelize/sequelize");

const userRouter = require("@server/internal/delivery/http/user");
const yargs_ = require("@server/lib/yargs/support");
require("./version");

const parser = yargs(hideBin(process.argv))
  .command("serve", "Serve the app.", async ({ argv }) => {
    //declare
    const { dbType, dbStr, debug, listenPort } = argv;

    try {
      if (debug) {
        console.log("enable debug mode.");
      }

      //start db
      var [sequelizeDb, err] = await sequelize.open(dbType, dbStr);
      if (err !== null) {
        throw new Error(err);
      }

      // Run the auto migration tool.
      var err = sequelize.schema.create(sequelizeDb);
      if (err !== null) {
        throw new Error(err);
      }

      // Create a new http server via express.
      const app = express();

      app.use(express.json());
      app.use(cors());
      app.use(userRouter);

      //start server
      app.listen(listenPort, () => {
        console.log("Server is up on port " + listenPort);
      });

      // const closeDb = await sequelizeDb.close();
    } catch (error) {
      console.log("error from the app:", error);
    }
  })

  .option("host", yargs_.PersistentFlags().StringVar("Host of my app.", "localhost"))
  .option("listen-port", yargs_.PersistentFlags().StringVar("Host of my app.", "3000", "p"))
  .option("jwt-secret", yargs_.PersistentFlags().StringVar("JWT secret used to generate JWT token."))
  .option("db-type", yargs_.PersistentFlags().StringVar("DB type. E.g. sqlite3"))
  .option("db-str", yargs_.PersistentFlags().StringVar("Connection string to the DB."))
  .option("debug", yargs_.PersistentFlags().BoolVarP("Enable debug mode.", "d"));

module.exports = {
  Execute: () => parser.parse(),
};
