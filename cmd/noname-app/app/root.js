const express = require("express");
const cors = require("cors");

const Yargs = require("@server/lib/yargs");
const Sequelize = require("@server/lib/sequelize");
const log = require("@server/lib/log");
const morgan = require("@server/lib/morgan");
const Http = require("@server/internal/delivery/http");

const Version = require("./version");
Version.Use("1.0.0");

class App {
  constructor() {}

  static Execute() {
    Yargs.Start()
      .command("serve", "Serve the app.", yargsServeHandler)

      .option("host", Yargs.PersistentFlags().StringVar("Host of my app.", "localhost"))
      .option("listen-port", Yargs.PersistentFlags().StringVar("Host of my app.", "3000", "p"))
      .option("jwt-secret", Yargs.PersistentFlags().StringVar("JWT secret used to generate JWT token."))
      .option("db-type", Yargs.PersistentFlags().StringVar("DB type. E.g. sqlite3"))
      .option("db-str", Yargs.PersistentFlags().StringVar("Connection string to the DB."))
      .option("debug", Yargs.PersistentFlags().BoolVarP("Enable debug mode.", "d"))
      .parse();
  }
}

module.exports = App;

async function yargsServeHandler({ argv }) {
  //declare
  const { dbType, dbStr, debug, listenPort } = argv;

  try {
    if (debug) {
      log.SetLevel(log.DebugLevel);
    }
    //start db
    var [sequelizeDb, err] = await Sequelize.Open(dbType, dbStr);

    if (err !== null) {
      throw new Error(err);
    }

    // Run the auto migration tool.
    var err = Sequelize.Schema.Create(sequelizeDb);
    if (err !== null) {
      throw new Error(err);
    }

    // Create a new http server via express.
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(morgan.Middleware());
    app.use(Http.AttachUserServiceHTTPHandler(sequelizeDb));
    app.use(Http.AttachImageServiceHTTPHandler(sequelizeDb));

    //start server
    app.listen(listenPort, () => {
      log.Info("Server is up on port " + listenPort);
    });

    // const closeDb = await sequelizeDb.close();
  } catch (error) {
    log.Error("error from the app:", error);
  }
}
