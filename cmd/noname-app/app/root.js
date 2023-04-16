const express = require("express");
const cors = require("cors");
const yargs = require("yargs/yargs");
const { hideBin } = require("yargs/helpers");

const userRouter = require("@server/internal/delivery/http/user");
const PersistentFlags = require("@server/lib/yargs/api");
require("./version");

const parser = yargs(hideBin(process.argv))
  .command("serve", "Serve the app.", ({ argv }) => {
    if (argv.debug) {
      console.log("enable debug mode.");
    }

    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(userRouter);

    app.listen(argv.listenPort, () => {
      console.log("Server is up on port " + argv.listenPort);
    });
  })

  .option("host", PersistentFlags().StringVar("Host of my app.", "localhost"))
  .option("listen-port", PersistentFlags().StringVar("Host of my app.", "3000", "p"))
  .option("jwt-secret", PersistentFlags().StringVar("JWT secret used to generate JWT token."))
  .option("db-type", PersistentFlags().StringVar("DB type. E.g. sqlite3"))
  .option("db-str", PersistentFlags().StringVar("Connection string to the DB."))
  .option("debug", PersistentFlags().BoolVarP("Enable debug mode.", "d"));

module.exports = {
  Execute: () => parser.parse(),
};
